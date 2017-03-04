import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { Subscription, Observable } from 'rxjs'
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
    @Input() articleId : string
    user: Meteor.User
    comments: Observable<C0mment[]>
    commentsSub: Subscription
    imagesSub : Subscription

    constructor() {}

    ngOnInit() {
        this.kill()
        this.user
        this.imagesSub = MeteorObservable.subscribe('images').subscribe()

        if (this.articleId)
            this.callComments()
    }

    private callComments() {
        this.commentsSub = MeteorObservable.subscribe('comments', this.articleId).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.comments = Comments.find({ 
                    $and: [
                        { 'father': this.articleId },
                        { 'son': '' }
                    ]
                }).zone()
            })
        })
    }

    private kill() {
        if (this.commentsSub)
            this.commentsSub.unsubscribe()

        if (this.imagesSub)
            this.imagesSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
