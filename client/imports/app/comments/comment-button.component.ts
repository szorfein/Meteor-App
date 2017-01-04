import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Meteor } from 'meteor/meteor'
import { Comments } from '/both/collections/comments.collection'
import { C0mment } from '/both/models/comment.model'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import template from './comment-button.component.html'

@Component({
    moduleId: module.id,
    selector: 'comment-button',
    template
})

@InjectUser('user')
export class CommentButtonComponent implements OnInit {
    replyForm: FormGroup
    editForm: FormGroup
    user: Meteor.User

    @Input() post: C0mment
    @Input() articleId: string
    @Input() index: number

    constructor(private formBuilder: FormBuilder) {}
    ngOnInit() {

        this.user
        this.printReplyForm()
        this.printEditForm()
    }

    printReplyForm():void {
        this.replyForm = this.formBuilder.group({
            post: ['', Validators.required]
        })
    }

    printEditForm():void {
        this.editForm = this.formBuilder.group({
            post: [this.post.post, Validators.required]
        })
    }

    edit(post: C0mment):void {
        if (this.editForm.valid && post && this.articleId && this.user) {
            Comments.update(post._id, {
                $set: {
                    lastposted: new Date(),
                    post: this.editForm.value.post
                }
            })
        }
    }

    reply(post: C0mment):void {
        if (this.replyForm.valid && post && this.articleId && this.user) {
            Comments.insert({
                poster: this.user.username,
                posted: new Date(),
                post: this.replyForm.value.post,
                lastposted: new Date(),
                father: this.articleId,
                son: post._id
            })
            this.replyForm.reset()
        }
    }

    remove(post: C0mment):void {
        if (post)
            Comments.remove(post._id)
    }
}
