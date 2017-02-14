import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { AboutDetail } from '/both/models/extra.model'
import template from './about-detail-me.component.html'

@Component({
    selector: 'about-detail-me',
    template
})

export class AboutDetailMeComponent implements OnInit, OnDestroy {
    @Input() about : AboutDetail
    imageSub: Subscription
    formular : string = 'about'

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
    }

    ngOnDestroy() {
        if (this.imageSub)
            this.imageSub.unsubscribe()
    }
}
