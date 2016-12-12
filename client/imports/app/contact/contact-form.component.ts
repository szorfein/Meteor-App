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

import template from './contact-form.component.html'

@Component({
    selector: 'contact-form',
    template
})

export class ContactFormComponent implements OnInit, OnDestroy {

    root: Observable<UserExt>
    rootsub: Subscription
    contactForm: FormGroup

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
        this.contactForm = this.formBuilder.group({
            post: ['', Validators.required],
            lang: ['en', Validators.required]
        })
    }

    addPost() {
        if (this.contactForm.valid) {
            let defaultname = 'contact'
            let finalname = defaultname + this.contactForm.value.lang
            console.log('finalname = ' + finalname)

            Extras.insert({
                lastEdit: new Date(),
                post: this.contactForm.value.post,
                lang: this.contactForm.value.lang,
                title: finalname
            })

            this.contactForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.rootsub)
            this.rootsub.unsubscribe()

    }
}
