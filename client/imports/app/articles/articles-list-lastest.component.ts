import { Component, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Meteor } from 'meteor/meteor'
import template from './articles-list-lastest.component.html'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

@Component({
    selector: 'articles-list-lastest',
    template
})

export class ArticlesListLastestComponent implements OnInit, OnDestroy {

    articleList: Observable<Article[]>
    articleSub : Subscription
    imageSub : Subscription

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.articleSub = MeteorObservable.subscribe('articles').subscribe(() => {
            this.callArticles()
        })
    }

   callArticles() {
       this.articleList = Articles.find({},{
           sort: { createdAt: -1 }, limit:3
       }).zone()
   }

    ngOnDestroy() {
        if (this.articleSub)
            this.articleSub.unsubscribe()
        if (this.imageSub)
            this.imageSub.unsubscribe()
    }
}
