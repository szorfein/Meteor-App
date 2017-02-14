import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { AboutDetail } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'
import template from './about-display.component.html'

enum elements {
    me , blog , social , mix , footer
}

@Component({
    selector: 'about-display',
    template
})

export class AboutDisplayComponent implements OnInit, OnDestroy {
    @Input() element : string
    about : Observable<AboutDetail>
    aboutSub : Subscription
    aboutMe : boolean = false
    aboutBlog : boolean = false
    aboutSocial : boolean = false
    aboutMix : boolean = false
    aboutFooter : boolean = false

    constructor() {}

    ngOnInit() {
        this.killSub()
        this.callAbout()
        this.loadElement()
    }

    callAbout() {
        this.aboutSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.about = AboutsDetail.findOne()
            })
        })
    }

    private loadElement() {
        if (this.element == 'mix')
            this.aboutMix = true
        else if (this.element == 'me')
            this.aboutMe = true
        else if (this.element == 'blog')
            this.aboutBlog = true
        else if (this.element == 'social')
            this.aboutSocial = true
        else if (this.element == 'footer')
            this.aboutFooter = true
    }

    private ctrlElement() {
        return this.element == elements[0]
            || this.element == elements[1]
            || this.element == elements[2]
            || this.element == elements[3]
            || this.element == elements[4]
    }

    private killSub() {
        if (this.aboutSub)
            this.aboutSub.unsubscribe()
    }

    ngOnDestroy() {
        this.killSub()
    }
}
