import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'

import { CanActivate } from '@angular/router'

import { UserExt } from '/both/models/user.model'
import { UsersExt } from '/both/collections/users.collection'

import template from './user-details.component.html'

import { Accounts } from 'meteor/accounts-base'

@Component({
    selector: 'user-detail',
    template
})

@InjectUser('user')
export class UserDetailsComponent implements OnInit, OnDestroy, CanActivate {
    user: Meteor.User
    userName: string
    paramsSub: Subscription
    userExt: UserExt
    userExtSub: Subscription

    userRegister
    userext

    constructor( private route: ActivatedRoute ) {}

    canActivate() {
        const userExt = UsersExt.findOne({ 'idOwner': this.user })
        return (userExt && userExt.idOwner == Meteor.userId())
    }

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['userName'])
        .subscribe(userName => {
            this.userName = userName

            this.user
            this.userext = UsersExt.findOne({ 'idOwner': this.userName })

            if (this.user) {
                MeteorObservable.call('createUserProfil', this.user._id, this.userName)
                .subscribe(() => {
                    console.log(this.userName + ' has been created .')
                }, (error) => { console.log(`Failed because -> ${error}`) })
            }
        })
    }

    ngOnDestroy() {
    }
}
