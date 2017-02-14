import { Component, Input } from '@angular/core'
import { AboutDetail } from '/both/models/extra.model'
import template from './about-social.component.html'

@Component({
    selector: 'social',
    template
})

export class AboutSocialComponent {
    @Input() social : AboutDetail
    constructor() {}
}
