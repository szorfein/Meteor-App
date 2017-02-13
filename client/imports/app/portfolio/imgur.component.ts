import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { ImgurLinks } from '/both/collections/portfolios.collection'
import { ImgurLink } from '/both/models/portfolio.model'
import { MeteorObservable } from 'meteor-rxjs'
import template from './imgur.component.html'

@Component({
    selector : 'imgur',
    template
})

export class ImgurComponent implements OnInit, OnDestroy {

    portfolioSub : Subscription
    portfolio : Observable<ImgurLink[]>
    formular : string = 'portfolio'

    constructor() {}

    ngOnInit() {
        this.loadImages()
    }

    loadImages() {
            this.portfolioSub = MeteorObservable.subscribe('imgurLatest').subscribe(() => {
                this.portfolio = ImgurLinks.find({},{skip:0,limit:3,sort:{'submitAt':-1}})
            })
    }

    ngOnDestroy() {
        this.portfolioSub.unsubscribe()
    }
}
