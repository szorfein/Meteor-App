import { Component, OnInit, OnDestroy } from '@angular/core'
import { Meteor } from 'meteor/meteor'
import { Subscription, Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { MeteorObservable } from 'meteor-rxjs'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import template from './comments-form.component.html'

@Component({
    selector: 'comment-form',
    template
})

@InjectUser('user')
export class CommentsFormComponent implements OnInit, OnDestroy {

    user: Meteor.User
    articleId: string
    urlparam: Subscription
    addForm: FormGroup

    constructor(private route: ActivatedRoute, 
                private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            post: ['', Validators.required]
        })

        this.urlparam = this.route.params
        .map(params => params['articleId'])
        .subscribe(articleId => {
            this.articleId = articleId
            this.user
        })
    }

    addComment():void {
        if (this.addForm.valid) {
            MeteorObservable.call('AddComment', 
                                  this.articleId, 
                                  this.user.username,
                                  this.addForm.value.post)
            .subscribe(() => {
                console.log('Add Comment From ' + this.user.username + ' Success')
            }, (error) => { console.log(`Failed Add Comment cause -> $(error)`) })

            this.addForm.reset()
        }
    }

    ngOnDestroy() {
        this.urlparam.unsubscribe()
    }
}
