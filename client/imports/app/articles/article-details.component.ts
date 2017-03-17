import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import 'rxjs/add/operator/map'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { Images } from '/both/collections/images.collection'
import template from './article-details.component.html'

@Component({
    selector: 'article-details',
    template
})

export class ArticleDetailsComponent implements OnInit, OnDestroy {

    imageSub : Subscription
    paramsSub: Subscription
    articleSub: Subscription
    article: Observable<Article>

    articleId: string
    formular : string
    me : string = 'me'
    blog : string = 'blog'

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.kill()
        this.formular = "editArticle"
        this.paramsSub = this.route.params.map(params => params['articleId']).subscribe(articleId => {
            this.articleId = articleId
            this.imageSub = MeteorObservable.subscribe('images').subscribe()
            this.printArticle()
            this.isNewView()
        })
    }

    printArticle() {
        this.articleSub = MeteorObservable.subscribe('article', this.articleId).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.article = Articles.findOne({ '_id': this.articleId })
            })
        })
    }
            
    private isNewView() {
        MeteorObservable.call('newViewToArticle', this.articleId).subscribe(() => {
            console.log('new ip add to view')
        }, (err) => { console.log(`Error -> ${err}`)})
    }

    private kill() {
        if (this.imageSub)
            this.imageSub.unsubscribe()

        if (this.paramsSub)
            this.paramsSub.unsubscribe()

        if (this.articleSub)
            this.articleSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
