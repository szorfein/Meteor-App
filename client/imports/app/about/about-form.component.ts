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
    detailSub: Subscription
    aboutForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {

        this.detailSub = MeteorObservable.subscribe('pubAbout').subscribe()

        if (!!Meteor.user()) {
            if(this.rootSub)
                this.rootSub.unsubscribe()

            this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    this.callRoot()
                    this.printForm()
                })
            })
        }
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((user) => {
            this.root = user
        })
    }

    printForm() {
        MeteorObservable.call('editOrAddAbout').subscribe((about) => {
            this.editForm(about)
        }, () => {
            this.addForm()
        })
    }

    editForm(about) {
        if (about) {
            this.aboutForm = this.formBuilder.group({
                image: [about.image],
                name: [about.name, Validators.required],
                lang: ['en', Validators.required],
                company: [about.company],
                aboutCompany: [about.company[0].yourCompany],
                jobName: [about.jobName[0].yourjob],
                mail: [about.mail],
                mobile: [about.telMobile],
                fix: [about.telFix],
                fax: [about.fax],
                aboutMe: [about.aboutYourSelf[0].yourself],
                address: [about.address],
                facebook: [about.facebookLink],
                github: [about.githubLink],
                twitter: [about.twitterLink],
                dotshare: [about.dotshareLink],
                imgur: [about.imgurLink],
                reddit: [about.redditLink]
            })
        }
    }

    addForm() {
        this.aboutForm = this.formBuilder.group({
            image: [''],
            name: ['', Validators.required],
            lang: ['en', Validators.required],
            company: [''],
            aboutCompany: [''],
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

    onImage(imageId: string) {
        this.aboutForm.value.image = imageId
    }

    ngOnDestroy() {
        if (this.rootSub) {
            this.rootSub.unsubscribe()
        }
        this.detailSub.unsubscribe()
    }
}
