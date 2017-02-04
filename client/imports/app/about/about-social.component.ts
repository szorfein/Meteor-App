import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { SocialTag } from '/both/models/extra.model'
import template from './about-social.component.html'

@Component({
    selector: 'social',
    template
})

export class AboutSocialComponent implements OnInit, OnDestroy {

    social
    socialSub: Subscription

    constructor() {}

    ngOnInit() {

        if (this.socialSub)
            this.socialSub.unsubscribe()

        this.socialSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.callSocialList()
            })
        })
    }

    callSocialList() {
        MeteorObservable.call('socialList').subscribe((ssList : SocialTag) => {
            this.social = ssList
        },() => {})
    }

    ngOnDestroy() {
        this.socialSub.unsubscribe()
    }
}
