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
    formAnonym : FormGroup
    captchaRes : boolean = false

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
            this.formAnonym = this.formBuilder.group({
                post: ['', Validators.required],
                username: ['', Validators.required],
                email: ['', Validators.required],
                website: ['']
            })
        }
    }

    handleResult(res) {
        this.captchaRes = res
    }

    addComment():void {
        if (this.addForm.valid && Meteor.userId()) {

            MeteorObservable.call('AddComment', this.article, this.addForm.value.post).subscribe(() => {
                console.log('Add Comment From ' + this.user.username + ' Success')
            }, (error) => {
                console.log(`Failed Add Comment cause -> $(error)`) 
            })

        } else if (this.formAnonym.valid && !Meteor.userId() && this.captchaRes) {

            MeteorObservable.call('AddCommentWithoutRegister', this.article, this.formAnonym.value).subscribe(() => {
                console.log('Add Comment From ' + this.formAnonym.value.username + ' Success')
            }, (error) => { console.log(`Failed Add Comment cause -> $(error)`) })
        }

        this.addForm.reset()
        this.formAnonym.reset()
    }
}
