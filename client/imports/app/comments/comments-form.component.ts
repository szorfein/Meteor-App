import { Component, Input, OnInit } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { MeteorObservable } from 'meteor-rxjs'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import template from './comments-form.component.html'

@Component({
    selector: 'comment-form',
    template
})

@InjectUser('user')
export class CommentsFormComponent implements OnInit {
    @Input() article : string
    user: Meteor.User
    addForm: FormGroup

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        if (this.article) {
            this.makeForm()
            this.user
        }
    }

    private makeForm() {
        if (Meteor.userId()) {
            this.addForm = this.formBuilder.group({
                post: ['', Validators.required]
            })
        } else {
            this.addForm = this.formBuilder.group({
                post: ['', Validators.required],
                username: ['', Validators.required],
                email: ['', Validators.required],
                website: [''],
                captcha: ['', Validators.required]
            })
        }
    }

    addComment():void {
        if (this.addForm.valid && Meteor.userId()) {

            MeteorObservable.call('AddComment', this.article, this.addForm.value.post).subscribe(() => {
                console.log('Add Comment From ' + this.user.username + ' Success')
            }, (error) => {
                console.log(`Failed Add Comment cause -> $(error)`) 
            })

        } else if (this.addForm.valid && !Meteor.userId()) {

            MeteorObservable.call('AddCommentWithoutRegister', this.article, this.addForm.value).subscribe(() => {
                console.log('Add Comment From ' + this.user.username + ' Success')
            }, (error) => { console.log(`Failed Add Comment cause -> $(error)`) })
        }

        this.addForm.reset()
    }
}
