import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import 'rxjs/add/operator/map'
import template from './tag-articles-list.component.html'

@Component({
    selector: 'tag-articles-list',
    template
})

export class TagArticlesListComponent implements OnInit, OnDestroy {

    paramSub : Subscription
    imagesSub : Subscription
    articles : Observable<Article[]>
    articlesSub : Subscription
    blog : string = 'blog'
    formular : string = 'article'

    constructor(private route : ActivatedRoute) {}

    ngOnInit() {
        this.paramSub = this.route.params.map(params => params['tag']).subscribe(tag => {
            this.callArticles(tag)
        })
    }

    private callArticles(tag : string) {
        this.imagesSub = MeteorObservable.subscribe('images').subscribe()
        this.articlesSub = MeteorObservable.subscribe('articlesTag', tag).subscribe(() => {
            this.articles = Articles.find({ 'tags' : tag }, {skip:0,limit:5,sort:{'createdAt': -1}}).zone()
        }, (err) => { alert(`fail to load tag -> ${err}`)})
    }

    private kill() {
        this.imagesSub.unsubscribe()
        this.paramSub.unsubscribe()
        if (this.articlesSub) 
            this.articlesSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
