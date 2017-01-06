import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Accounts } from 'meteor/accounts-base'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { Md5 } from 'ts-md5/dist/md5'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Captcha } from '/both/models/captcha.model'
import { Captchas } from '/both/collections/captchas.collection'

import template from './signup.component.html'
import style from './signup.component.scss'

@Component({
    selector: 'signup',
    template,
    styles: [style]
})

export class SignupComponent implements OnInit, OnDestroy {

    timer : Date = new Date()
    timeOut : Date
    hash
    signupForm : FormGroup
    error: string
    captcha: Captcha
    captchaSub: Subscription

    constructor(
        private router: Router,
        private zone: NgZone,
        private formBuilder: FormBuilder
    ) {}

    // TODO: find a way for select ONE captcha with random.
    ngOnInit() {
        if (this.captchaSub) 
            this.captchaSub.unsubscribe()

        this.captchaSub = MeteorObservable.subscribe('captcha','en').subscribe(() => {
            this.selectCaptcha()
            if (this.captcha) {
                this.doHashThis()
                this.printSignup()
                this.initTimeOut()
            } else {
                console.log('this.captcha has fail to initialize ')
            }
        })
        this.error = ''
    }

    randomIntFromInterval(min,max):number {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    selectCaptcha():void {
        let nbCaptcha : number = Counts.get('numberOfCaptcha')
        let selectRow : number = this.randomIntFromInterval(1,nbCaptcha)
        console.log('selectRow will choose -> ' + selectRow)
        this.captcha = Captchas.findOne({ $and: [
            {'bloc.lang': 'en'},
            {'index': selectRow }
        ]})
    }

    printSignup():void {
        if (this.captcha) {
            this.signupForm = this.formBuilder.group({
                email: ['', Validators.required],
                password: ['', Validators.required],
                username: ['', Validators.required],
                captcha: ['', Validators.required]
            })
        }
    }

    captchaControl():boolean {
        return (this.captcha.bloc[0].response == this.signupForm.value.captcha)
    }

    signupCondition():boolean {
        if (!this.checkIsValidHash())
            console.log('checkIsValidHash has fail')

        if (!this.checkTimerValid())
            console.log('checkTimerValid has fail')

        if (!this.captchaControl())
            console.log('captchaControl has fail')

        return (this.checkIsValidHash() && this.checkTimerValid() && this.captchaControl())
    }

    // TODO: control response is good.
    signup():void {
        if (this.signupForm.valid && this.signupCondition()) {
            Accounts.createUser({
                email: this.signupForm.value.email,
                password: this.signupForm.value.password,
                username: this.signupForm.value.username
            }, (err) => {
                if (err) {
                    this.zone.run(() => {
                        this.error = err
                    })
                } else {
                    this.router.navigate(['/'])
                }
            })
        }
    }

    // We estimate than complete form will give minimum 10 second !
    initTimeOut():void {
        this.timeOut = new Date()
        this.timeOut.setSeconds(this.timeOut.getSeconds() + 10)
    }

    // We estimate than complete form will give minimum 10 second !
    checkTimerValid():boolean {
        let time : Date = new Date()
        return (time > this.timeOut)
    }

    // TODO: Will be transform to method
    // TODO: salt will be register server side into config.file
    doHashThis():void {
        let salt : string = 'gijagoijaognrni'
        let time : Date = this.timer
        time.setMinutes(time.getMinutes(), 0);
        let willbetransform = time + this.captcha._id + salt
        this.hash = Md5.hashStr(willbetransform)
    }

    // set time for +10 minutes (maximal time for complete captcha)
    checkIsValidHash():boolean {
        let salt : string = 'gijagoijaognrni'
        let time : Date = this.timer
        for (let i = 0; i < 10; i++) {
            time.setMinutes(time.getMinutes() + i, 0);
            let willbetransform = time + this.captcha._id + salt
            let newHash = Md5.hashStr(willbetransform)

            if (newHash == this.hash) {
                return true
            }
        }
        console.log('CheckValidHash no found valid HASH !')
        return false
    }

    ngOnDestroy() {
        this.captchaSub.unsubscribe()
    }
}
