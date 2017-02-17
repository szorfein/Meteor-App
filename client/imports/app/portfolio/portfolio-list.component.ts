import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { ImgurLinks } from '/both/collections/portfolios.collection'
import { ImgurLink } from '/both/models/portfolio.model'
import template from './portfolio-list.component.html'

@Component({
    selector: 'portfolio-list',
    template
})

export class PortfolioListComponent implements OnInit, OnDestroy {

    portfolio : Observable<ImgurLink[]>
    portfolioSub : Subscription

    constructor() {}

    ngOnInit() {
        this.kill()
        this.callPortfolio()
    }

    callPortfolio() {
        this.portfolioSub = MeteorObservable.subscribe('portfolioList').subscribe(() => {
            this.portfolio = ImgurLinks.find()
        })
    }

    private kill() {
        if (this.portfolioSub)
            this.portfolioSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
