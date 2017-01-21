import { OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription, Subject } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { PaginationService } from 'ng2-pagination'
import { getIndex } from '/lib/index'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import MarkdownIt = require('markdown-it')

interface Pagination {
    limit: number;
    skip: number;
}

interface Options extends Pagination {
    [key: string]: any
}

@InjectUser('user')
export class ArticlesList implements OnInit, OnDestroy {
    articles: Observable<Article[]>
    articlesSub: Subscription
    pageSize : Subject<number> = new Subject<number>()
    curPage : Subject<number> = new Subject<number>()
    nameOrder : Subject<number> = new Subject<number>()
    optionsSub : Subscription
    articlesSize: number = 0
    autorunSub : Subscription
    user: Meteor.User
    imageSub : Subscription
    indexSub: Subscription
    root
    rootsub: Subscription
    md = new MarkdownIt()

    constructor( private paginationService : PaginationService ) {}

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.indexSub = MeteorObservable.subscribe('indexArticle').subscribe()

        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.curPage,
            this.nameOrder
        ).subscribe(([pageSize, curPage, nameOrder]) => {
            const options: Options = {
                limit : pageSize as number,
                skip : ((curPage as number) - 1) * (pageSize as number),
                sort : { createdAt : nameOrder as number }
            }

            this.paginationService.setCurrentPage(
                this.paginationService.defaultId(), 
                curPage as number
            )

            if (this.articlesSub)
                this.articlesSub.unsubscribe()

            this.articlesSub = MeteorObservable.subscribe('articles', options)
            .subscribe(() => { 
                       this.articles = Articles.find({}, {
                           sort: {
                               createdAt: nameOrder
                           }
                       }).zone()
            })
        })

        this.paginationService.register({
            id: this.paginationService.defaultId(),
            itemsPerPage: 6,
            currentPage: 1,
            totalItems: this.articlesSize
        })

        this.pageSize.next(6)
        this.curPage.next(1)
        this.nameOrder.next(1)

        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.articlesSize = getIndex('articleId')
            this.paginationService.setTotalItems(
                this.paginationService.defaultId(),
                this.articlesSize
            )
        })

        if (this.rootsub)
            this.rootsub.unsubscribe()

        if (!!Meteor.user()) {
            this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    this.callRoot()
                })
            })
        }
    }
    
    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root) => {
            this.root = root
        })
    }

    markdownDisplay(text:string):string {
        if (this.articles)
            return this.md.render(text)
    }

    removeArticle(article: Article) {
        MeteorObservable.call('remArticle', article._id).subscribe(() => {
            console.log('article has been destroy')
        }, (err) => {
            alert(`Cannot destroy article cause ${err}`)
        })
    }

    search(value: string): void {
        console.log('search value : ' + value.length)

        if (value.length === 2) 
            this.articles = Articles.find(value ? { 'bloc.lang': value } : {}).zone()
    }

    searchByTag(tag) {
        if (tag)
            this.articles = Articles.find({ 'tags': tag }).zone()
    }

    onPageChanged(page: number):void {
        this.curPage.next(page)
    }

    ngOnDestroy() {
        this.articlesSub.unsubscribe()
        this.optionsSub.unsubscribe()
        this.imageSub.unsubscribe()
        this.autorunSub.unsubscribe()
        this.indexSub.unsubscribe()
        if (this.rootsub)
            this.rootsub.unsubscribe()
    }
}
