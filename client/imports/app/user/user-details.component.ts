import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, CanActivate } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { UserExt } from '/both/models/user.model'
import template from './user-details.component.html'

@Component({
    selector: 'user-detail',
    template
})

export class UserDetailsComponent implements CanActivate, OnInit, OnDestroy {
    userName : string = ''
    paramsSub: Subscription
    root
    rootSub: Subscription
    user
    userSub: Subscription
    isActivate : boolean = false

    constructor( private route: ActivatedRoute ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['userName'])
        .subscribe(userName => {
            this.userName = userName

            if (this.userSub) {
                this.userSub.unsubscribe()
            }

            this.userSub = MeteorObservable.subscribe('userprofile', this.userName).subscribe(() => {
                this.isOwner()
            })

            if (this.rootSub) 
                this.rootSub.unsubscribe()

            this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
                this.callRoot()
            })
        })
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root) => {
            this.root = root
        })
    }

    isOwner() {
        MeteorObservable.call('isOwner', this.userName).subscribe((user : UserExt) => {
            this.user = user
            this.isActivate = true
            console.log('isOwner return true')
        }, () => {
            this.isActivate = false
            console.log('isOwner return false')
        })
    }

    canActivate() {
        return this.isActivate
    }

    ngOnDestroy() {
        if (this.userSub)
            this.userSub.unsubscribe()

        if (this.rootSub)
            this.rootSub.unsubscribe()
    }
}
