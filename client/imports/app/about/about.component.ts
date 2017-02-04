import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import template from './about.component.html'

@Component({
    selector: 'about-me',
    template
})

export class AboutComponent {

    constructor( private route: ActivatedRoute ) {}
}
