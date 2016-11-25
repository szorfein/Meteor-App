import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'

import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

import template from './tag-detail.component.html'

@Component({
    selector: 'tag-details',
    template
})

export class TagDetailComponent implements OnInit, OnDestroy {

    tag: Tag
    tagSub: Subscription

    articles: Observable<Article[]>
    articlesSub: Subscription

    paramsSub: Subscription

    tagName: string

    // USAGE -> result[] = merge(object, id)
    // -> return result[ { id: value }, { id: value }... ]
    merge(root, value) {
        var tmp = []
        for (var i = 0; i < arguments.length; i++) {
            tmp.push({ [value] : root[i][value] })
        }
        return tmp 
    }

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['tagName'])
        .subscribe(tagName => {
            this.tagName = tagName

            if (this.tagSub) {
                this.tagSub.unsubscribe()
            }

            this.tag = Tags.findOne({ 'name': this.tagName })

            this.articles = Articles.find({ 'tags': this.tagName }).zone()
            this.articlesSub = MeteorObservable.subscribe('articles').subscribe()
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe()
    }
}
