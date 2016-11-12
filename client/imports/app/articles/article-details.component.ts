import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import 'rxjs/add/operator/map'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

import template from './article-details.component.html'

@Component({
    selector: 'article-details',
    template
})

export class ArticleDetailsComponent implements OnInit, OnDestroy {

    articleId: string
    paramsSub: Subscription
    article: Article

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['articleId'])
        .subscribe(articleId => {
            this.articleId = articleId
            this.article = Articles.findOne(this.articleId)
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
    }
}
