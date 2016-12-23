import { Component } from '@angular/core'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import template from './header-component.html'
import style from './header-component.scss'

@Component({
    selector: 'header-main',
    template,
    styles: [style]
})

@InjectUser('user')
export class HeaderComponent {

    constructor() {
    }
}

