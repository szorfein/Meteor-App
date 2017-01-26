import { Component, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { User } from '/both/models/user.model'
import { Users } from '/both/collections/users.collection'
import template from './users-last-register.component.html'

@Component({
    selector: 'user-last',
    template
})

export class UsersLastRegisterComponent implements OnInit, OnDestroy {

    users : Observable<User[]>
    usersSub : Subscription
    imageSub : Subscription

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.usersSub = MeteorObservable.subscribe('lastRegistered').subscribe(() => {
            this.users = Users.find({},{sort: {createdAt: -1}, skip:0,limit:3})
        })
    }

    ngOnDestroy() {
        this.imageSub.unsubscribe()
        this.usersSub.unsubscribe()
    }
}
