import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import template from './about.component.html'

@Component({
    selector: 'about-me',
    template
})

export class AboutComponent implements OnInit, OnDestroy {
    me : string = 'me'
    blog : string = 'blog'
    imageSub : Subscription

    constructor( private route: ActivatedRoute ) {}

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
    }

    ngOnDestroy() {
        this.imageSub.unsubscribe()
    }
}
