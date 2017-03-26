import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { AboutDetail } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'
import { facebook , git , twitter , dotshare , imgur , reddit , 
    name , lang , mail , company } from '/lib/validate'
import { retLang } from '/lib/lang'
import template from './about-form.component.html'

@Component({
    selector: 'about-form',
    template
})

export class AboutFormComponent implements OnInit, OnDestroy {

    about : AboutDetail
    aboutSub: Subscription
    aboutForm: FormGroup
    image : string

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.killSub()
        this.aboutSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            this.printForm()
        })
    }

    private killSub() {
        if (this.aboutSub)
            this.aboutSub.unsubscribe()
    }

    private printForm() {
       MeteorObservable.autorun().subscribe(() => {
           this.about = AboutsDetail.findOne()
           if (this.about)
               this.editForm()
           else
               this.addForm()
       })
    }

    private editForm() {
        if (this.about) {
            this.image = this.about.imageOfYou
            this.aboutForm = this.formBuilder.group({
                image: [this.image],
                name: [this.about.name, name],
                lang: ['en', lang],
                company: [this.about.company, company],
                aboutCompany: [this.about.lang[retLang('en')].aboutCompany],
                jobName: [this.about.lang[retLang('en')].job],
                aboutYou: [this.about.lang[retLang('en')].aboutYou],
                skill: [this.about.lang[retLang('en')].skills],
                mail: [this.about.email, mail],
                mobile: [this.about.mobile],
                fix: [this.about.fix],
                fax: [this.about.fax],
                street: [this.about.address.street],
                cp: [this.about.address.cp],
                city: [this.about.address.city],
                facebook: [this.about.facebook, facebook],
                github: [this.about.github, git],
                twitter: [this.about.twitter, twitter],
                dotshare: [this.about.dotshare, dotshare],
                imgur: [this.about.imgur, imgur],
                reddit: [this.about.reddit, reddit]
            })
        }
    }

    private addForm() {
        this.aboutForm = this.formBuilder.group({
            image: [''],
            name: ['', name],
            lang: ['en', lang],
            company: ['', company],
            aboutCompany: [''],
            jobName: [''],
            skill: [''],
            mail: ['', mail],
            mobile: [''],
            fix: [''],
            fax: [''],
            aboutYou: [''],
            street: [''],
            cp: [''],
            city: [''],
            facebook: ['', facebook],
            github: ['', git],
            twitter: ['', twitter],
            dotshare: ['', dotshare],
            imgur: ['', imgur],
            reddit: ['', reddit]
        })
    }

    addPost() {
        if (this.aboutForm.valid) {
            MeteorObservable.call('createAboutInfo', this.aboutForm.value, this.image).subscribe(() => {
                alert('information has been register');
            }, (err) => {
                alert(`Cannot add information because: ${err}`)
            })

            this.aboutForm.reset()
        }
    }

    onImage(imageId: string) {
        this.image = imageId
    }

    ngOnDestroy() {
        this.killSub()
    }
}
