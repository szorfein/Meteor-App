import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import MarkdownIt = require('markdown-it')

import 'rxjs/add/operator/map'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { UsersExt } from '/both/collections/usersext.collection'
import { UserExt } from '/both/models/userext.model'

import template from './article-details.component.html'

@Component({
    selector: 'article-details',
    template
})

@InjectUser('user')
export class ArticleDetailsComponent implements OnInit, OnDestroy {

    user: Meteor.User
    articleId: string
    paramsSub: Subscription

    root: Observable<UserExt>
    rootsub: Subscription

    /* Bug if i add Observable<Article>, test later with update...
    * Complain about property 'xxx' do not exist on type 'Observable<>'
    */
    article: Article
    articleSub: Subscription

    md = new MarkdownIt()

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['articleId'])
            .subscribe(articleId => {
                this.articleId = articleId
            
                this.user
                this.printArticle()
                
                if (!!Meteor.user()) {
                    if (this.rootsub) 
                        this.rootsub.unsubscribe()

                    this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                        MeteorObservable.autorun().subscribe(() => {
                            this.callRoot()
                        })
                    })
                }
            })
    }

    callRoot() {
        this.root = UsersExt.findOne({'idOwner': Meteor.userId() })
    }

    printArticle() {
        if (this.articleSub)
            this.articleSub.unsubscribe()

        this.articleSub = MeteorObservable
        .subscribe('article', this.articleId)
        .subscribe(() => {
            this.article = Articles.findOne({ '_id': this.articleId })
        })
    }

    markdownDisplay(text:string):string { 
        if (this.article) 
            return this.md.render(text)
    } 

    saveArticle() {
        if (!Meteor.userId()) {
            alert('Please log in to change this article')
            return
        }

        if (this.article) {
            Articles.update(this.article._id, {
                $set: {
                    image: this.article.image,
                    bloc: this.article.bloc
                }
            })
        }
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
    }
}
