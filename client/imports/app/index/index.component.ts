import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { HomeDetail } from '/both/models/extra.model'
import { HomesDetail } from '/both/collections/extras.collection'
import template from './index.component.html'

@Component({
    selector: 'index',
    template
})

export class IndexComponent implements OnInit, OnDestroy {

    homeSub: Subscription
    imageSub : Subscription
    home : Observable<HomeDetail>
    formular : string
    blog : string = 'blog'
    me : string = 'me'
    index : string = 'index'

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.homeSub = MeteorObservable.subscribe('pubHome').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.home = HomesDetail.findOne({})
            })
        })
        this.formular = "index"
    }

    ngOnDestroy() {
        this.homeSub.unsubscribe()
        this.imageSub.unsubscribe()
    }
}
