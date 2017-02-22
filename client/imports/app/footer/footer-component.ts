import { Component } from '@angular/core'
import template from './footer-component.html'

@Component({
    selector: 'footer-main',
    template
})

export class FooterComponent {
    about : string = 'footer'
    inline : string = 'inline'
    sidebarM : string = 'sidebar'
    constructor() {}
}
