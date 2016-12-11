import { Component, OnInit } from '@angular/core'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import template from './header-component.html'

@Component({
    selector: 'header-main',
    template
})

@InjectUser('user')
export class HeaderComponent implements OnInit {
    user: Meteor.User

    ngOnInit() {
        this.user
    }
}

