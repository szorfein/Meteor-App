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

import template from './about-form.component.html'

@Component({
    selector: 'about-form',
    template
})

export class AboutFormComponent implements OnInit, OnDestroy {

    root: Observable<UserExt>
    rootsub: Subscription
    aboutForm: FormGroup

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
        this.aboutForm = this.formBuilder.group({
            post: ['', Validators.required],
            lang: ['en', Validators.required]
        })
    }

    addPost() {
        if (this.aboutForm.valid) {
            let defaultname = 'about'
            let finalname = defaultname + this.aboutForm.value.lang
            console.log('finalname = ' + finalname)

            Extras.insert({
                lastEdit: new Date(),
                post: this.aboutForm.value.post,
                lang: this.aboutForm.value.lang,
                title: finalname
            })

            this.aboutForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.rootsub)
            this.rootsub.unsubscribe()

    }
}
