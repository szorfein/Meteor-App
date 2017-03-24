import { Component } from '@angular/core'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import template from './signup.component.html'

@Component({
    selector: 'signup',
    template
})

@InjectUser('user')
export class SignupComponent {
    constructor() {}
}
