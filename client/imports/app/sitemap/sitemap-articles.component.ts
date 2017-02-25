import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './sitemap-articles.component.html'

@Component({
    selector: 'sitemap-articles',
    template
})

export class SitemapArticlesComponent implements OnInit, OnDestroy {

    constructor() {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
