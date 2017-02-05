import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { UserBar } from '/both/models/user.model'
import template from './root.input.html'

enum formular {
    index , about , article
}

@Component({
    selector: 'admin',
    template
})

export class RootInput implements OnInit, OnDestroy {
    @Input() form

    root
    rootSub : Subscription
    index : boolean = false
    about : boolean = false
    article : boolean = false

    constructor() {}

    ngOnInit() {
        if (this.rootSub)
            this.rootSub.unsubscribe()

        this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.callRoot()
                this.loadForm()
            })
        })
    }

    loadForm() {
        if (this.lookArg) {
            if (this.form == 'index')
                this.index = true
            else if (this.form == 'about')
                this.about = true
            else if (this.form == 'article')
                this.article = true
        }
    }

    lookArg() : boolean {
        return this.form == formular[0]
            || this.form == formular[1]
            || this.form == formular[2]
            || this.form == formular[3]
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root : UserBar) => {
            this.root = root
        })
    }

    ngOnDestroy() {
        if (this.rootSub)
            this.rootSub.unsubscribe()
    }
}
