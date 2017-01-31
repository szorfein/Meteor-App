import { Component, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Index } from '/both/models/index.model'
import { getIndex } from '/lib/index'
import template from './root-dashboard-list.component.html'

@Component({
    selector: 'root-list',
    template
})

export class RootDashboardListComponent implements OnInit, OnDestroy {

    indexArticle : number
    indexArticleSub : Subscription
    analyticsSub : Subscription

    constructor() {}

    ngOnInit() {
        this.getip()
        this.indexArticleSub = MeteorObservable.subscribe('indexArticle').subscribe(() => {
            this.indexArticle = getIndex('articleId')
        })
    }

    getip() {
        MeteorObservable.call('registerAnalytic').subscribe(() => {
            console.log('register')
        }, (err) => {
            console.log('cannot found ip')
        })
    }

    ngOnDestroy() {
        this.indexArticleSub.unsubscribe()
    }
}
