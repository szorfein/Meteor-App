import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { UserBar } from '/both/models/user.model'
import template from './root.input.html'

enum formular {
    index , about , article , editArticle , portfolio
}

@Component({
    selector: 'admin',
    template
})

export class RootInput implements OnInit, OnDestroy {
    @Input() form
    @Input() edit

    root
    rootSub : Subscription
    index : boolean = false
    about : boolean = false
    article : boolean = false
    editArticle : boolean = false
    portfolio : boolean = false

    constructor() {}

    ngOnInit() {
        this.kill()
        this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.callRoot()
                this.loadForm()
            })
        })
    }

    private loadForm() {
        if (this.form == formular[0]){
            this.index = true
        } else if (this.form == formular[1]) {
            this.about = true
        } else if (this.form == formular[2]) {
            this.article = true
        } else if (this.form == formular[3]) {
            this.editArticle = true
        } else if (this.form == formular[4]) {
            this.portfolio = true
        }
    }

    private kill() {
        if (this.rootSub)
            this.rootSub.unsubscribe()
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root : UserBar) => {
            this.root = root
        })
    }

    ngOnDestroy() {
        this.kill()
    }
}
