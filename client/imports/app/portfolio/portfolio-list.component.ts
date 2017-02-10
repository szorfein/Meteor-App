import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import template from './portfolio-list.component.html'

@Component({
    selector: 'portfolio-list',
    template
})

export class PortfolioListComponent implements OnInit, OnDestroy {

    constructor() {}

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
