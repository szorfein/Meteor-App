import { Component, OnInit, OnDestroy } from '@angular/core'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './articles-doc-footer.component.html'

@Component({
    selector: 'doc-footer',
    template
})

export class ArticlesDocFooterComponent implements OnInit, OnDestroy {

    articles : Observable<Article[]>
    articlesSub : Subscription

    constructor() {}

    ngOnInit() {
        this.kill()
        this.callArticles()
    }

    private kill() {
        if (this.articlesSub)
            this.articlesSub.unsubscribe()
    }

    private callArticles() {
        this.articlesSub = MeteorObservable.subscribe('articlesDoc').subscribe(() => {
            this.articles = Articles.find({'pastToFooter': true},{skip:0,limit:6,sort:{'createdAt':-1}}).zone()
        })
    }

    ngOnDestroy() {
        this.kill()
    }
}
