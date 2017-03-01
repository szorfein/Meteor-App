import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import template from './articles-related.component.html'

@Component({
    selector: 'articles-related',
    template
})

export class ArticlesRelatedComponent implements OnInit, OnDestroy {
    @Input() tags : Array<string>
    articles : Observable<Article[]>
    articlesSub : Subscription
    thumbnail : string = 'thumbnail'

    constructor() {}

    ngOnInit() {
        if (this.tags) {
            this.kill()
            this.callArticles()
        }
    }

    private callArticles() {
        this.articlesSub = MeteorObservable.subscribe('articlesRelated', this.tags).subscribe(() => {
            this.articles = Articles.find({ $or: [
                { 'tags': this.tags[0] },
                { 'tags': this.tags[1] }
            ]}).zone()
        }, (err) => { console.log(err) })
    }

    private kill() {
        if (this.articlesSub) 
            this.articlesSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
