import { Component, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { name, forceMail, passwd } from '/lib/validate'
import { RegisterUser } from '/both/models/user.model'
import { Accounts } from 'meteor/accounts-base'
import { MeteorObservable } from 'meteor-rxjs'
import template from './signup-form.component.html'

@Component({
    selector: 'signup-form',
    template
})

export class SignupFormComponent implements OnInit {

    signupForm : FormGroup
    captchaRes : boolean = false

    constructor( 
        private zone : NgZone,
        private formBuilder : FormBuilder,
        private router : Router
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
                            console.log('err signup router')
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
