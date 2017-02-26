import { Component, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { ImgurLinks } from '/both/collections/portfolios.collection'
import { ImgurLink } from '/both/models/portfolio.model'
import template from './sitemap-portfolio.component.html'

@Component({
    selector: 'sitemap-portfolio',
    template
})

export class SitemapPortfolioComponent implements OnInit, OnDestroy {

    portfolios : Observable<ImgurLink[]>
    portfoliosSub : Subscription

    constructor() {}

    ngOnInit() {
        this.kill()
        this.callPortfolios()
    }

    private callPortfolios() {
        this.portfoliosSub = MeteorObservable.subscribe('portfolioList').subscribe(() => {
            this.portfolios = ImgurLinks.find()
        })
    }

    private kill() {
        if (this.portfoliosSub)
            this.portfoliosSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
