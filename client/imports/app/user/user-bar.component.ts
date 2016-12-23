import { Component, OnInit, OnDestroy, NgZone } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import { User } from '/both/models/user.model'
import { Users } from '/both/collections/users.collection'
import { UserExt } from '/both/models/userext.model'
import { UsersExt } from '/both/collections/usersext.collection' 

import template from './user-bar.component.html'
import style from './user-bar.component.scss'

@Component({
    selector: 'user-bar',
    template,
    styles: [style]
})

@InjectUser('user')
export class UserBarComponent implements OnInit, OnDestroy {

    user: Observable<User>
    usersub: Subscription
    userext: Observable<UserExt[]>
    userextsub: Subscription

    ngOnInit() {

        if (this.usersub) 
            this.usersub.unsubscribe()

        this.usersub = MeteorObservable.subscribe('userinfo').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.user = Users.find(Meteor.userId())
                this.getUser()

                if (!!this.user)
                    this.createUserProfil(this.user)
            })
        })

        if (this.userextsub) 
            this.userextsub.unsubscribe()

        this.userextsub = MeteorObservable
        .subscribe('userbar')
        .subscribe(() => {
            this.userext
            this.getUserInfo(this.user)
        })
    }

    getUser() {
        this.user = Users.find(Meteor.userId())
    }

    getUserInfo(user: User) {
        if (!!Meteor.userId()) {
            this.userext = UsersExt.findOne(user._id)
        }
    }

    createUserProfil(user: User) {
        if (!!Meteor.userId()) {
            MeteorObservable.call('createUserProfil', user)
            .subscribe(() => { 
                console.log('User create') 
            }, (error) => { console.log(`Fail create user or alrealy exist ${error}`) }) 
        }
    }

    logout() {
        Meteor.logout()
    }

    ngOnDestroy() {
        this.userextsub.unsubscribe()
        this.usersub.unsubscribe()
    }
}
