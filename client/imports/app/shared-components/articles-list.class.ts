import { NgZone, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import { MeteorObservable } from 'meteor-rxjs'
import { PaginationService } from 'ng2-pagination'

import 'rxjs/add/operator/combineLatest'

import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'
import { Counts } from 'meteor/tmeasday:publish-counts'

import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { UserExt } from '/both/models/userext.model'
import { UsersExt } from '/both/collections/usersext.collection'

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
    user: Meteor.User
    articles: Observable<Article[]>
    articlesSub: Subscription
    optionsSub : Subscription
    articlesSize: number = 0
    autorunSub : Subscription

    pageSize : Subject<number> = new Subject<number>()
    curPage : Subject<number> = new Subject<number>()
    nameOrder : Subject<number> = new Subject<number>()

    root: Observable<UserExt>
    rootsub: Subscription
    
    md = new MarkdownIt()
    imageSub : Subscription

    constructor(
        private zone: NgZone,
        private paginationService : PaginationService
    ) {}

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()

        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.curPage,
            this.nameOrder
        ).subscribe(([pageSize, curPage, nameOrder]) => {
            const options: Options = {
                limit : pageSize as number,
                skip : ((curPage as number) - 1) * (pageSize as number),
                sort : { name : nameOrder as number }
            }

            this.paginationService.setCurrentPage(
                this.paginationService.defaultId, 
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
            id: this.paginationService.defaultId,
            itemsPerPage: 6,
            currentPage: 1,
            totalItems: this.articlesSize
        })

        this.pageSize.next(5)
        this.curPage.next(1)
        this.nameOrder.next(1)

        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.articlesSize = Counts.get('numberOfArticles')
            this.paginationService.setTotalItems(
                this.paginationService.defaultId,
                this.articlesSize
            )
        })

        if (this.rootsub)
            this.rootsub.unsubscribe()

        if (!!Meteor.user()) {
            this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    this.callRoot()
                }, (error) => {
                    if (error) {
                        this.zone.run(() => {
                        })
                    }
                })
            })
        }
    }
    
    callRoot() {
        this.root = UsersExt.findOne({ 'idOwner': Meteor.userId() })
    }

    markdownDisplay(text:string):string {
        if (this.articles)
            return this.md.render(text)
    }

    removeArticle(article: Article): void {
        Articles.remove(article._id)
    }

    search(value: string): void {
        console.log('search value : ' + value.length)
        if (value.length === 2)
            this.articles = Articles.find(value ? { 'bloc.lang': value } : {}).zone()
    }

    onPageChanged(page: number):void {
        this.curPage.next(page)
    }

    ngOnDestroy() {
        this.articlesSub.unsubscribe()
        this.optionsSub.unsubscribe()
        this.imageSub.unsubscribe()
        this.autorunSub.unsubscribe()
    }
}
