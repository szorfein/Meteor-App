import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import template from './contact.component.html'

@Component({
    selector: 'contact',
    template
})

export class ContactComponent {

    constructor(
        private route: ActivatedRoute
    ) {}
}
