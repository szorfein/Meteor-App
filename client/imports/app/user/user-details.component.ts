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
    userext
    userextsub: Subscription

    constructor( private route: ActivatedRoute ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['userName'])
        .subscribe(userName => {
            this.userName = userName

            if (this.userextsub) {
                this.userextsub.unsubscribe()
            }

            this.userextsub = MeteorObservable
            .subscribe('userprofile', this.userName)
            .subscribe(() => {
                this.callUser()
            })

            if (this.rootSub) 
                this.rootSub.unsubscribe()

            this.rootSub = MeteorObservable
            .subscribe('root').subscribe(() => {
                this.callRoot()
            })
        })
    }

    callUser() {
        MeteorObservable.call('isOwner', this.userName).subscribe((user) => {
            this.userext = user
        },(err) => {
            alert(`Cannot acces to userprofile cause ${err}`)
        })
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root) => {
            this.root = root
        })
    }

    canActivate() {
        MeteorObservable.call('isOwner', this.userName).subscribe((user:UserExt) => {
            return true
        }, () => {
            return false
        })
    }

    ngOnDestroy() {
        this.userextsub.unsubscribe()
        this.rootSub.unsubscribe()
    }
}
