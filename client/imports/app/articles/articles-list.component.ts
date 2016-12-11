import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { UserExt } from '/both/models/userext.model'
import { UsersExt } from '/both/collections/usersext.collection'

import template from './articles-list.component.html'

@Component({
    selector: 'articles-list',
    template
})

@InjectUser('user')
export class ArticlesListComponent implements OnInit, OnDestroy {
    user: Meteor.User
    articles: Observable<Article[]>
    articlesSub: Subscription

    root: Observable<UserExt>
    rootsub: Subscription
    
    constructor(private zone: NgZone) {}

    ngOnInit() {
        this.articles = Articles.find({}).zone()
        this.articlesSub = MeteorObservable.subscribe('articles').subscribe()

        if(this.rootsub)
            this.rootsub.unsubscribe()

        if (!!Meteor.user()) {
            this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    this.callRoot()
                }, (error) => {
                    if (error) {
                        this.zone.run(() => {
                        })
                    }
                })
            })
        }
    }
    
    callRoot() {
        this.root = UsersExt.findOne({ 'idOwner': Meteor.userId() })
    }

    removeArticle(article: Article): void {
        Articles.remove(article._id)
    }

    search(value: string): void {
        console.log('search value : ' + value.length)
        if (value.length === 2)
            this.articles = Articles.find(value ? { 'bloc.lang': value } : {}).zone()
    }

    ngOnDestroy() {
        this.articlesSub.unsubscribe()
    }
}
