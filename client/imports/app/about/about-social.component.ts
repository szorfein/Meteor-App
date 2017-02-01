import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './about-social.component.html'

@Component({
    selector: 'social',
    template
})

export class AboutSocialComponent implements OnInit, OnDestroy {

    socialSub: Subscription
    social

    constructor() {}

    ngOnInit() {
        this.socialSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            this.callSocialList()
        })
    }

    callSocialList() {
        MeteorObservable.call('socialList').subscribe((ssList) => {
            this.social = ssList
        })
    }

    ngOnDestroy() {
        this.socialSub.unsubscribe()
    }
}
