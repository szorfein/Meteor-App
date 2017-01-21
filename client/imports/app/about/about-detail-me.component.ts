import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import template from './about-detail-me.component.html'

@Component({
    selector: 'about-detail-me',
    template
})

export class AboutDetailMeComponent implements OnInit, OnDestroy {

    imageSub: Subscription
    aboutSub: Subscription
    about

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.aboutSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            this.callAbout()
        })
    }

    callAbout() {
        MeteorObservable.call('sendAboutForView').subscribe((about) => {
            this.about = about
        })
    }

    ngOnDestroy() {
        if (this.imageSub)
            this.imageSub.unsubscribe()

        if (this.aboutSub)
            this.aboutSub.unsubscribe()
    }
}
