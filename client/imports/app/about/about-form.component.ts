import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs/Subscription'
import { Meteor } from 'meteor/meteor'

import template from './about-form.component.html'

@Component({
    selector: 'about-form',
    template
})

export class AboutFormComponent implements OnInit, OnDestroy {

    root
    rootSub: Subscription
    aboutForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {

        if (!!Meteor.user()) {
            if(this.rootSub)
                this.rootSub.unsubscribe()

            this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    this.callRoot()
                })
                this.printForm()
            })
        }
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((user) => {
            this.root = user
        })
    }

    printForm() {
        this.aboutForm = this.formBuilder.group({
            image: [''],
            name: ['', Validators.required],
            lang: ['en', Validators.required],
            company: [''],
            jobName: [''],
            mail: [''],
            mobile: [''],
            fix: [''],
            fax: [''],
            aboutMe: [''],
            address: [''],
            facebook: [''],
            github: [''],
            twitter: [''],
            dotshare: [''],
            imgur: [''],
            reddit: ['']
        })
    }

    addPost() {
        if (this.aboutForm.valid) {
            MeteorObservable.call('createAboutInfo', this.aboutForm.value).subscribe(() => {
                alert('information has been register');
            }, (err) => {
                alert(`Cannot add information because: ${err}`)
            })

            this.aboutForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.rootSub)
            this.rootSub.unsubscribe()
    }
}
