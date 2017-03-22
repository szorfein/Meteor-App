import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Meteor } from 'meteor/meteor'
import { forceMail, passwd } from '/lib/validate'
import template from './login-form.component.html'

@Component({
    selector: 'login-form',
    template
})

export class LoginFormComponent implements OnInit {
    loginForm: FormGroup
    error: string

    constructor(
        private router: Router, 
        private zone: NgZone, 
        private formBuilder: FormBuilder
    ) {}

    // TODO , add 'forceMail' & 'passwd' as validator before launch to prod !
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        })
        this.error = ''
    }

    login() {
        if (this.loginForm.valid) {
            Meteor.loginWithPassword(
                this.loginForm.value.email,
                this.loginForm.value.password, 
                (err) => {
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
}
