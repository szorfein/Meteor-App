import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'

import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'

import { UserExt } from '/both/models/userext.model'
import { UsersExt } from '/both/collections/usersext.collection'

import template from './user-details.component.html'

@Component({
    selector: 'user-detail',
    template
})

@InjectUser('user')
export class UserDetailsComponent implements OnInit, OnDestroy {

    user: Meteor.User
    userName: string
    paramsSub: Subscription

    userext: Observable<UserExt[]>
    userextsub: Subscription

    userRegister

    constructor( private route: ActivatedRoute ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['userName'])
        .subscribe(userName => {
            this.userName = userName

            this.user

            if (this.userextsub) {
                this.userextsub.unsubscribe()
            }

            this.userextsub = MeteorObservable
            .subscribe('userprofile', this.userName)
            .subscribe(() => {
                this.userext = UsersExt.findOne({ 'name': this.userName })
            })
        })
    }

    ngOnDestroy() {
        this.userextsub.unsubscribe()
    }
}
