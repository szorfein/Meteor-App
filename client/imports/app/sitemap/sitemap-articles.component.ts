import { Component, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import template from './sitemap-articles.component.html'

@Component({
    selector: 'sitemap-articles',
    template
})

export class SitemapArticlesComponent implements OnInit, OnDestroy {

    articles : Observable<Article[]>
    articlesSub : Subscription

    constructor() {}

    ngOnInit() {
        this.kill()
        this.callArticles()
    }

    private callArticles() {
        this.articlesSub = MeteorObservable.subscribe('articles',{}).subscribe(() => {
            this.articles = Articles.find({}, {skip:0,sort: {'createdAt':-1}})
        })
    }

    private kill() {
        if (this.articlesSub)
            this.articlesSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
