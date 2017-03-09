import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { Subscription } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { forceMail, name, domain } from '/lib/validate'
import template from './comments-form.component.html'

@Component({
    selector: 'comment-form',
    template
})

@InjectUser('user')
export class CommentsFormComponent implements OnInit, OnDestroy {
    @Input() article : string
    user: Meteor.User
    addForm: FormGroup
    formAnonym : FormGroup
    captchaRes : boolean = false
    autorunSub : Subscription

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.kill()
        if (this.article) {
            this.autorunSub = MeteorObservable.autorun().subscribe(() => {
                this.makeForm()
                this.user
            })
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
                username: ['', name],
                email: ['', forceMail],
                website: ['', domain]
            })
        }
    }

    handleResult(res) {
        this.captchaRes = res
    }

    addComment() {
        if (this.addForm.valid && Meteor.userId()) {

            MeteorObservable.call('AddComment', this.article, this.addForm.value.post).subscribe(() => {
                console.log('Add Comment From ' + this.user.username + ' Success')
                this.addForm.reset()
            }, (error) => {
                console.log(`Failed Add Comment cause -> $(error)`) 
            })
        } 
    }

    addAnonym() {
        if (this.formAnonym.valid && !Meteor.userId() && this.captchaRes) {
            MeteorObservable.call('AddCommentWithoutRegister', this.article, this.formAnonym.value).subscribe(() => {
                console.log('Add Comment From ' + this.formAnonym.value.username + ' Success')
                this.formAnonym.reset()
            }, (error) => { console.log(`Failed Add Comment cause -> $(error)`) })
        }
    }

    private kill() {
        if (this.autorunSub)
            this.autorunSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
