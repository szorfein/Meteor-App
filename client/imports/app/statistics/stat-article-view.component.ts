import { Component, Input, OnInit } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { isMeteorId } from '/lib/validate'
import { Index } from '/both/models/index.model'
import { Indexes } from '/both/collections/indexes.collection'
import template from './stat-article-view.component.html'

@Component({
    selector: 'stat-article-view',
    template
})

export class StatArticleViewComponent implements OnInit {
    @Input() article : string
    indexSub : Subscription
    view : number
    index : Index

    constructor() {}

    ngOnInit() {
        if (isMeteorId(this.article)) {
            this.callIndex() 
        }
    }

    private callIndex() {
        this.indexSub = MeteorObservable.subscribe('index', this.article, 'stat').subscribe(() => {
            let _tmpVar = 'stat' + this.article
            this.index = Indexes.findOne({ _id: _tmpVar })
            this.view = this.index ? this.index.seq : 0
        })
    }
}
