import { Component, OnInit, OnDestroy } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { MeteorObservable } from 'meteor-rxjs'

import { Comments } from '/both/collections/comments.collection'
import { C0mment } from '/both/models/comment.model'

import { InjectUser } from 'angular2-meteor-accounts-ui'
import template from './comments-article.component.html'

@Component({
    selector: 'comment',
    template
})

@InjectUser('user')
export class CommentsArticleComponent implements OnInit, OnDestroy {

    user: Meteor.User
    articleId: string
    urlparam: Subscription

    comment: Observable<C0mment[]>
    commentSub: Subscription
    
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.urlparam = this.route.params
        .map(params => params['articleId'])
        .subscribe(articleId => {
            this.articleId = articleId
            this.user
            this.commentSub = MeteorObservable
            .subscribe('comments', articleId)
            .subscribe(() => {
                this.comment = Comments.find({ 'father': this.articleId })
            })
        })
    }

    editComment() {

    }

    delComment() {

    }

    ngOnDestroy() {
        this.urlparam.unsubscribe()
    }
}
