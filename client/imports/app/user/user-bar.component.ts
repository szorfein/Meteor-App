import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { User, UserBar } from '/both/models/user.model'
import template from './user-bar.component.html'

@Component({
    selector: 'user-bar',
    template
})

@InjectUser('user')
export class UserBarComponent implements OnInit, OnDestroy {

    user
    userSub: Subscription

    ngOnInit() {

        if (this.userSub) 
            this.userSub.unsubscribe()

        this.userSub = MeteorObservable.subscribe('userbar').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.callUser()
            })
        })
    }

    callUser() {
        MeteorObservable.call('userInfoBar').subscribe((user: UserBar) => {
            this.user = user
        })
    }

    logout() {
        Meteor.logout()
    }

    ngOnDestroy() {
        this.userSub.unsubscribe()
    }
}
