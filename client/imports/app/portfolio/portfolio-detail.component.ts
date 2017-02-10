import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import 'rxjs/add/operator/map'
import template from './portfolio-detail.component.html'

@Component({
    selector: 'portfolio-detail',
    template
})

export class PortfolioDetailComponent implements OnInit, OnDestroy {

    paramsSub : Subscription
    imgId : string

    constructor(private route : ActivatedRoute) {}

    ngOnInit() {
        this.paramsSub = this.route.params.map(params => params['id']).subscribe(id => {
            this.imgId = id
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
    }
}
