import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Accounts } from 'meteor/accounts-base'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import { MeteorObservable } from 'meteor-rxjs'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { Captchas } from '/both/collections/captchas.collection'
import { SecretCaptcha } from '/both/models/captcha.model'
import { Meteor } from 'meteor/meteor'

import template from './signup.component.html'
import style from './signup.component.scss'

@Component({
    selector: 'signup',
    template,
    styles: [style]
})

export class SignupComponent implements OnInit, OnDestroy {

    captcha 
    timer : Date = new Date()
    timeOut : Date
    signupForm : FormGroup
    error: string
    captchaSub: Subscription
    captchaClick : boolean = false

    constructor(
        private router: Router,
        private zone: NgZone,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        if (this.captchaSub) 
            this.captchaSub.unsubscribe()

        this.captchaSub = MeteorObservable.subscribe('captcha','en').subscribe(() => {
            this.getCaptcha()
        })

        this.error = ''
    }

    getCaptcha() {
        let getCount = this.generateCount()
        MeteorObservable.call('secretCaptcha', getCount).subscribe((captcha) => {
            MeteorObservable.autorun().subscribe(() => {
                this.captcha = captcha
                this.printSignup()
                this.initTimeOut()
            })
        }, (err) => {
            alert(`cannot create captcha cause ${err}`)
        })
    }

    onClickCaptcha() {
        if (this.captchaClick)
            this.captchaClick = false
        else
            this.captchaClick = true
    }

    generateCount() {
        let nbCaptcha : number = Counts.get('numberOfCaptcha')
        return nbCaptcha
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
        let resp : string = this.signupForm.value.captcha
        let ques : string = this.captcha.question
        let bool : boolean
        MeteorObservable.call('controlResponse', ques, resp).subscribe(() => {
            bool = true
        }, (err) => {
            alert(`Bad cause ${err}`)
            bool = false
        })
        return bool
    }

    // If not valid Hash, we remake an other captcha
    signupCondition() {
        this.checkIsValidHash()
        this.captchaControl()
        this.checkTimerValid()
    }

    signup():void {
        this.signupCondition()
        if (this.signupForm.valid && this.checkTimerValid()) {
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

    checkIsValidHash() {
        MeteorObservable.call('checkValidHash', this.captcha).subscribe(() => {
            return true
        }, (err) => {
            alert(`Probleme with captcha, will generata an other...${err}`)
            this.getCaptcha()
        })
    }

    ngOnDestroy() {
        this.captchaSub.unsubscribe()
    }
}
