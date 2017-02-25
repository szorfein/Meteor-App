import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './sitemap-portfolio.component.html'

@Component({
    selector: 'sitemap-portfolio',
    template
})

export class SitemapPortfolioComponent implements OnInit, OnDestroy {

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {}
}
