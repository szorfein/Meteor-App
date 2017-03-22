import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { AboutDetail } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'
import template from './about-display.component.html'

enum Display {
    bloc , inline , blog
}

enum Elements {
    me , blog , social , mix , footer , sidebar , address
}

@Component({
    selector: 'about-display',
    template
})

export class AboutDisplayComponent implements OnInit, OnDestroy {
    @Input() element : string
    @Input() display : string
    about : Observable<AboutDetail>
    aboutSub : Subscription
    aboutMe : boolean = false
    aboutBlog : boolean = false
    aboutSocial : boolean = false
    aboutMix : boolean = false
    aboutFooter : boolean = false
    aboutSidebar : boolean = false
    aboutAddress : boolean = false
    displayInline : boolean = false
    displayBloc : boolean = false
    displayBlog : boolean = false
    bloc : string = 'bloc'
    inline : string = 'inline'
    blog : string = 'blog'

    constructor() {}

    ngOnInit() {
        this.killSub()
        this.callAbout()
        this.setDisplay()
        this.loadElement()
    }

    private callAbout() {
        this.aboutSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.about = AboutsDetail.findOne()
            })
        })
    }

    private loadElement() {
        if (this.element == Elements[0])
            this.aboutMe = true
        else if (this.element == Elements[1])
            this.aboutBlog = true
        else if (this.element == Elements[2])
            this.aboutSocial = true
        else if (this.element == Elements[3])
            this.aboutMix = true
        else if (this.element == Elements[4])
            this.aboutFooter = true
        else if (this.element == Elements[5])
            this.aboutSidebar = true
        else if (this.element == Elements[6])
            this.aboutAddress = true
    }

    private setDisplay() {
        if (this.display == Display[0])
            this.displayBloc = true
        else if (this.display == Display[1])
            this.displayInline = true
        else if (this.display == Display[2])
            this.displayBlog = true
    }

    private killSub() {
        if (this.aboutSub)
            this.aboutSub.unsubscribe()
    }

    ngOnDestroy() {
        this.killSub()
    }
}
