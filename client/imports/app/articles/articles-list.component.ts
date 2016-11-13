import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

import template from './articles-list.component.html'

@Component({
    selector: 'articles-list',
    template
})

export class ArticlesListComponent implements OnInit, OnDestroy {
    articles: Observable<Article[]>
    articlesSub: Subscription
    
    ngOnInit() {
        this.articles = Articles.find({}).zone()
        this.articlesSub = MeteorObservable.subscribe('articles').subscribe()
    }
    
    removeArticle(article: Article): void {
        Articles.remove(article._id)
    }

    search(value: string): void {
        this.articles = Articles.find(value ? { body: value } : {}).zone()
    }

    ngOnDestroy() {
        this.articlesSub.unsubscribe()
    }
}
