import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

import template from '/client/imports/app/app.component.html'

@Component({
    selector: 'app',
    template
})

export class AppComponent {
    articles: Observable<Article[]>
    
    constructor() {
        this.articles = Articles.find({}).zone()
    }
}
