import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import 'rxjs/add/operator/map'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

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
    article: Article
    articleSub: Subscription

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['articleId'])
            .subscribe(articleId => {
                this.articleId = articleId
           
                if (this.articleSub) {
                    this.articleSub.unsubscribe()
                }

                    this.article = Articles.findOne(this.articleId)
            })
    }

    saveArticle() {
        if (!Meteor.userId()) {
            alert('Please log in to change this article')
            return
        }

        Articles.update(this.article._id, {
            $set: {
                title: this.article.title,
                image: this.article.image,
                writer: this.article.writer,
                body: this.article.body
            }
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
    }
}
