import { Component, Input } from '@angular/core'
import { AboutDetail } from '/both/models/extra.model'
import template from './about-detail-contact.component.html'

@Component({
    selector: 'about-detail-contact',
    template
})

export class AboutDetailContactComponent {
    sidebar : string = 'sidebar'
    @Input() about : AboutDetail
}
