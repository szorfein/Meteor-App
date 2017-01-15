import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import template from './about-detail-contact.component.html'

@Component({
    selector: 'about-detail-contact',
    template
})

export class AboutDetailContactComponent implements OnInit, OnDestroy {

    aboutSub: Subscription
    about

    ngOnInit() {
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
        this.aboutSub.unsubscribe()
    }
}
