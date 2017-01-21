import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './about.component.html'

@Component({
    selector: 'about-me',
    template
})

export class AboutComponent implements OnInit, OnDestroy {

    root
    rootSub: Subscription

    constructor( private route: ActivatedRoute ) {}

    ngOnInit() {

        if (this.rootSub)
            this.rootSub.unsubscribe()

        this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
            this.callRoot()
        })
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root) => {
            this.root = root
        })
    }

    ngOnDestroy() {
        if (this.rootSub)
            this.rootSub.unsubscribe()
    }
}
