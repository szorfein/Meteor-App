import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import 'rxjs/add/operator/map'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { Images } from '/both/collections/images.collection'
import template from './article-details.component.html'

@Component({
    selector: 'article-details',
    template
})

@InjectUser('user')
export class ArticleDetailsComponent implements OnInit, OnDestroy {

    imageSub : Subscription
    user: Meteor.User
    articleId: string
    paramsSub: Subscription
    article: Article
    articleSub: Subscription

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['articleId'])
            .subscribe(articleId => {
                this.articleId = articleId
            
                this.imageSub = MeteorObservable.subscribe('images').subscribe()

                this.user
                this.printArticle()
            })
    }

    printArticle() {
        if (this.articleSub)
            this.articleSub.unsubscribe()

        this.articleSub = MeteorObservable
        .subscribe('article', this.articleId)
        .subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.article = Articles.findOne({ '_id': this.articleId })
            })
        })
    }

    saveArticle() {
        Articles.update(this.article._id, {
            $set: {
                image: this.article.image,
                bloc: this.article.bloc
            }
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
        this.imageSub.unsubscribe()
    }
}
