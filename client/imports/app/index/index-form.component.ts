import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Meteor } from 'meteor/meteor'
import { UsersExt } from '/both/collections/usersext.collection'
import { UserExt } from '/both/models/userext.model'
import { Extra } from '/both/models/extra.model'
import { Extras } from '/both/collections/extras.collection'

import template from './index-form.component.html'

@Component({
    selector: 'index-form',
    template
})

export class IndexFormComponent implements OnInit, OnDestroy {

    root: Observable<UserExt>
    rootsub: Subscription
    indexForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {

        if (!!Meteor.user()) {
            if(this.rootsub)
                this.rootsub.unsubscribe()

            this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                this.callRoot()
                this.printForm()
            })
        }
    }

    callRoot() {
        this.root = UsersExt.findOne({ 'idOwner': Meteor.userId() })
    }

    printForm() {
        this.indexForm = this.formBuilder.group({
            post: ['', Validators.required],
            lang: ['en', Validators.required]
        })
    }

    addPost() {
        if (this.indexForm.valid) {
            let defaultname = 'index'
            let finalname = defaultname + this.indexForm.value.lang
            console.log('finalname = ' + finalname)

            Extras.insert({
                lastEdit: new Date(),
                post: this.indexForm.value.post,
                lang: this.indexForm.value.lang,
                title: finalname
            })

            this.indexForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.rootsub)
            this.rootsub.unsubscribe()

    }
}
