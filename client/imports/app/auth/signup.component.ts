import { Component, OnInit, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Accounts } from 'meteor/accounts-base'
import { MeteorObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { RegisterUser } from '/both/models/user.model'
import { name, forceMail, passwd } from '/lib/validate'
import template from './signup.component.html'

@Component({
    selector: 'signup',
    template
})

export class SignupComponent implements OnInit {

    signupForm : FormGroup
    captchaRes : boolean = false
    error : string

    constructor(
        private router: Router,
        private zone: NgZone,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.printSignup()
    }

    private printSignup() {
        this.signupForm = this.formBuilder.group({
            email: ['', forceMail],
            confirmEmail : ['', forceMail],
            password: ['', passwd],
            confirmPassword : ['', passwd],
            username: ['', name],
        })
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
        if (this.signupForm.valid && this.captchaRes && this.checkConfirm()) {
            MeteorObservable.call('registerUserFrom', this.signupForm.value)
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
                this.signupForm.reset()
            }, (err) => {
                alert(`You cannot been register cause ${err}`)
            })
        }
    }

    handleResult(res : boolean) {
        this.captchaRes = res
    }
}
