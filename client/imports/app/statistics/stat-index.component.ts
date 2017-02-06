import { Component, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { getIndex } from '/lib/index'
import template from './stat-index.component.html'

@Component({
    selector: 'stat-index',
    template
})

export class StatIndexComponent implements OnInit, OnDestroy {

    nbArticle : number
    indexSub : Subscription

    constructor() {}

    ngOnInit() {

        this.indexSub = MeteorObservable.subscribe('indexArticle').subscribe(() => {
            this.nbArticle = getIndex('articleId')
        })
    }

    ngOnDestroy() {
        this.indexSub.unsubscribe()
    }
}
