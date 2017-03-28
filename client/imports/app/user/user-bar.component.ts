import { Component, OnInit, OnDestroy } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { UserBar } from '/both/models/user.model'
import template from './user-bar.component.html'

@Component({
    selector: 'user-bar',
    template
})

export class UserBarComponent implements OnInit, OnDestroy {

    user : UserBar
    autorunSub : Subscription

    ngOnInit() {
        this.kill()
        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.callUser()
        })
    }

    private kill() {
        if (this.autorunSub)
            this.autorunSub.unsubscribe()
    }

    private callUser() {
        MeteorObservable.call('userInfoBar').subscribe((user : UserBar) => {
            this.user = user
        })
    }

    logout() {
        Meteor.logout()
    }

    ngOnDestroy() {
        this.kill()
    }
}
