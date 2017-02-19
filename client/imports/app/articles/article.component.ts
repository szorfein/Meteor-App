import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Article } from '/both/models/article.model'
import { Articles } from '/both/collections/articles.collection'
import template from './article.component.html'

enum Elements {
    list , sidebar , index
}

@Component({
    selector: 'article',
    template
})

export class ArticleComponent implements OnInit, OnDestroy {
    @Input() element : string
    
    nbElems : number
    formular : string
    articlesSub : Subscription
    imagesSub : Subscription
    articles : Observable<Article[]>
    elemList : boolean = false
    elemIndex : boolean = false
    elemSidebar : boolean = false
    inline : string = 'inline'
    card : string = 'card'

    constructor() {}

    ngOnInit() {
        this.kill()
        this.loadComponent()
        this.callArticle()
    }

    private loadComponent() {
        if (this.testComponent()) {
            if (this.element == Elements[0]) {
                this.elemList = true
                this.nbElems = 6
                this.formular = ''
            } else if (this.element == Elements[1]) {
                this.elemSidebar = true
                this.nbElems = 5
            } else if (this.element == Elements[2]) {
                this.elemIndex = true
                this.nbElems = 3
                this.formular = 'article'
            } 
        }
    }

    private testComponent() {
        return this.element == Elements[0]
            || this.element == Elements[1]
            || this.element == Elements[2]
    }

    private kill() {
        if (this.articlesSub)
            this.articlesSub.unsubscribe()

        if (this.imagesSub)
            this.imagesSub.unsubscribe()
    }

    callArticle() {
        if (this.nbElems <= 6) {
            this.imagesSub = MeteorObservable.subscribe('images').subscribe()
            this.articlesSub = MeteorObservable.subscribe('articlesNb', this.nbElems).subscribe(() => {
                this.articles = Articles.find().zone()
            })
        }
    }

    ngOnDestroy() {
        this.kill()
    }
}
