import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import template from './index.component.html'

@Component({
    selector: 'index',
    template
})

export class IndexComponent {
    constructor(
        private route: ActivatedRoute
    ) {}
}
