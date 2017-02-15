import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Accounts } from 'meteor/accounts-base'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { getIndex } from '/lib/index'
import { Meteor } from 'meteor/meteor'
import { RegisterUser } from '/both/models/user.model'
import { name, forceMail, passwd } from '/lib/validate'
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

        this.indexSub = MeteorObservable.subscribe('indexCaptcha').subscribe()

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
                email: ['', forceMail],
                confirmEmail : ['', forceMail],
                password: ['', passwd],
                confirmPassword : ['', passwd],
                username: ['', name],
                captcha: ['', Validators.required]
            })
        }
    }

    private checkEmail() {
        if (this.signupForm.value.email == this.signupForm.value.confirmEmail)
            return true
        else {
            alert('Emails are not sames')
            return false
        }
    }

    private checkPassword() {
        if (this.signupForm.value.password == this.signupForm.value.password)
            return true
        else {
            alert('Passwords are not sames')
            return false
        }
    }

    private checkConfirm() {
        return this.checkPassword() && this.checkEmail()
    }

    signup():void {
        this.captchaForm = { question: this.captcha.question,
            response: this.signupForm.value.captcha }
        if (this.signupForm.valid && this.checkTimerValid() && this.checkConfirm()) {
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
    private initTimeOut():void {
        this.timeOut = new Date()
        this.timeOut.setSeconds(this.timeOut.getSeconds() + 10)
    }

    // We estimate than complete form will give minimum 10 second !
    private checkTimerValid():boolean {
        let time : Date = new Date()
        return (time > this.timeOut)
    }

    ngOnDestroy() {
        this.captchaSub.unsubscribe()
        this.indexSub.unsubscribe()
    }
}
