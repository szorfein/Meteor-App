import { Component } from '@angular/core'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import template from './login.component.html'

@Component({
    selector: 'login',
    template
})

@InjectUser('user')
export class LoginComponent {
    constructor() {}
}
