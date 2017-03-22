import { Component } from '@angular/core'
import { Router } from '@angular/router'
import template from './login.component.html'

@Component({
    selector: 'login',
    template
})

export class LoginComponent {

    constructor(
        private router: Router, 
    ) {}

}
