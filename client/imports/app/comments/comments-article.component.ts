import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Meteor } from 'meteor/meteor'
import { Subscription } from 'rxjs/Subscription'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { MeteorObservable } from 'meteor-rxjs'

import { Comments } from '/both/collections/comments.collection'
import { C0mment } from '/both/models/comment.model'

import { InjectUser } from 'angular2-meteor-accounts-ui'

import MarkdownIt = require('markdown-it')
import template from './comments-article.component.html'
import style from './comments-article.component.scss'

@Component({
    selector: 'comment',
    template,
    styles: [style]
})

@InjectUser('user')
export class CommentsArticleComponent implements OnInit, OnDestroy {

    replyForm: FormGroup

    user: Meteor.User
    articleId: string
    urlparam: Subscription

    comments: Observable<C0mment[]>
    commentsSub: Subscription
    comment: C0mment
    
    md = new MarkdownIt()

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.urlparam = this.route.params
        .map(params => params['articleId'])
        .subscribe(articleId => {
            this.articleId = articleId
            this.user

            if (this.commentsSub)
                this.commentsSub.unsubscribe()

            this.commentsSub = MeteorObservable.subscribe('comments', articleId)
            .subscribe(() => {
                this.comments = Comments.find({ 
                    $and: [
                        { 'father': this.articleId },
                        { 'son': null }
                    ]
                })
                this.printReplyForm()
            })
        })
    }

    markdownDisplay(text: string):string {
        if (text)
            return this.md.render(text)
    }

    editComment(postId: string, postEdit: string):void {
        if (!Meteor.userId())
            return

        if (postId) {
            Comments.update(postId, {
                $set: {
                    lastposted: new Date(),
                    post: postEdit
                }
            })
        }
    }

    printReplyForm():void {
        this.replyForm = this.formBuilder.group({
            post: ['', Validators.required]
        })
    }

    replyComment(postId: string):void {
        if (this.replyForm.valid && postId) {
            Comments.insert({
                poster: this.user.username,
                posted: new Date(),
                post: this.replyForm.value.post,
                lastposted: new Date(),
                father: this.articleId,
                son: postId
            })
            this.replyForm.reset()
        }
    }

    delComment() {

    }

    ngOnDestroy() {
        this.urlparam.unsubscribe()
        this.commentsSub.unsubscribe()
    }
}
