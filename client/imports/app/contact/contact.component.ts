import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import template from './contact.component.html'

@Component({
    selector: 'contact',
    template
})

export class ContactComponent {
    address : string = 'address'

    constructor(
        private route: ActivatedRoute
    ) {}
}
