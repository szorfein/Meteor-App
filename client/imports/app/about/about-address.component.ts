import { Component, Input } from '@angular/core'
import { AboutDetail } from '/both/models/extra.model'
import template from './about-address.component.html'

@Component({
    selector: 'about-address',
    template
})

export class AboutAddressComponent {
    @Input() about : AboutDetail
    constructor() {}

}
