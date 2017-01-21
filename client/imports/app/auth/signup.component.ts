import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Accounts } from 'meteor/accounts-base'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { getIndex } from '/lib/index'
import { Meteor } from 'meteor/meteor'
import { RegisterUser } from '/both/models/user.model'
import template from './signup.component.html'

@Component({
    selector: 'signup',
    template
})

export class SignupComponent implements OnInit, OnDestroy {

    captcha 
    captchaForm
    timer : Date = new Date()
    timeOut : Date
    signupForm : FormGroup
    error: string
    captchaSub: Subscription
    captchaClick : boolean = false
    indexSub : Subscription

    constructor(
        private router: Router,
        private zone: NgZone,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {

        this.indexSub = MeteorObservable.subscribe('captchaId').subscribe()

        if (this.captchaSub) 
            this.captchaSub.unsubscribe()

        this.captchaSub = MeteorObservable.subscribe('captcha','en').subscribe(() => {
            this.getCaptcha()
        })
    }

    getCaptcha() {
        let getCount = getIndex('captchaId')
        MeteorObservable.call('secretCaptcha', getCount).subscribe((captcha) => {
            this.captcha = captcha
            this.printSignup()
            this.initTimeOut()
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

    signup():void {
        this.captchaForm = { question: this.captcha.question,
            response: this.signupForm.value.captcha }
        if (this.signupForm.valid && this.checkTimerValid()) {
            MeteorObservable.call('registerUserFrom', 
                                  this.signupForm.value,
                                  this.captcha,
                                  this.captchaForm)
            .subscribe((newNinja: RegisterUser) => {
                if (newNinja) {
                    Accounts.createUser({
                        email: newNinja.email,
                        password: newNinja.password,
                        username: newNinja.username
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
            }, (err) => {
                alert(`You cannot been register cause ${err}`)
                this.getCaptcha()
            })
           this.signupForm.reset()
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

    ngOnDestroy() {
        this.captchaSub.unsubscribe()
        this.indexSub.unsubscribe()
    }
}
