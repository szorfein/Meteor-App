import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { AboutDetail } from '/both/models/extra.model'
import template from './about-detail-me.component.html'

enum Display {
    bloc , inline , blog
}

@Component({
    selector: 'about-detail-me',
    template
})

export class AboutDetailMeComponent implements OnInit, OnDestroy {
    @Input() about : AboutDetail
    @Input() display : string
    imageSub: Subscription
    formular : string = 'about'
    displayBloc : boolean = false
    displayInline : boolean = false
    displayBlog : boolean = false
    bloc : string = 'bloc'
    inline : string = 'inline'
    social : string = 'social'

    ngOnInit() {
        this.setDisplay()
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
    }

    private setDisplay() {
        if (this.display == Display[0])
            this.displayBloc = true
        else if (this.display == Display[1])
            this.displayInline = true
        else if (this.display == Display[2])
            this.displayBlog = true
    }

    ngOnDestroy() {
        if (this.imageSub)
            this.imageSub.unsubscribe()
    }
}
