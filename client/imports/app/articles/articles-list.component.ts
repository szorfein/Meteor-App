import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

import template from './articles-list.component.html'

@Component({
    selector: 'articles-list',
    template
})

export class ArticlesListComponent {
    articles: Observable<Article[]>
    
    constructor() {
        this.articles = Articles.find({}).zone()
    }
    
    removeArticle(article: Article): void {
        Articles.remove(article._id)
    }
}
