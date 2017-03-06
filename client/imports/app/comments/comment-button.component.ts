import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Meteor } from 'meteor/meteor'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { C0mment } from '/both/models/comment.model'
import { MeteorObservable } from 'meteor-rxjs'
import template from './comment-button.component.html'

@Component({
    selector: 'comment-button',
    template
})

@InjectUser('user')
export class CommentButtonComponent implements OnInit {
    @Input() post: C0mment
    @Input() articleId: string
    replyForm: FormGroup
    editForm: FormGroup
    user: Meteor.User

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
        if (this.editForm.valid && post && this.articleId) {
            MeteorObservable.call('EditComment', post._id, this.editForm.value.post).subscribe(() => {
                console.log('Successfuly edit')
            }, (err) => { console.log(`Fail edit comment -> ${err}`) })
        }
    }

    reply(post: C0mment) {
        if (this.replyForm.valid && post && this.articleId) {
            MeteorObservable.call('AddComment', this.articleId, this.replyForm.value.post, post._id).subscribe(() => {
                console.log('comment add to -> ' + post._id)
                this.replyForm.reset()
            }, (err) => { console.log(`Error with comment -> ${err}`) })
        }
    }

    remove(post: C0mment):void {
        if (post) {
            MeteorObservable.call('DelComment', post._id).subscribe(() => {
                console.log('Comment has been delete')
            },(err) => { console.log(`Comment cannot been delete cause ${err}`) })
        }
    }
}
