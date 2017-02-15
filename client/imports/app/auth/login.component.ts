import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Meteor } from 'meteor/meteor'
import { forceMail, passwd } from '/lib/validate'
import template from './login.component.html'

@Component({
    selector: 'login',
    template
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup
    error: string

    constructor(
        private router: Router, 
        private zone: NgZone, 
        private formBuilder: FormBuilder
    ) {}

    // TODO , add 'passwd' before launch to prod !
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', forceMail],
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
