import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { Meteor } from 'meteor/meteor'
import { HomeDetail } from '/both/models/extra.model'
import template from './index-form.component.html'

@Component({
    selector: 'index-form',
    template
})

export class IndexFormComponent implements OnInit, OnDestroy {

    root
    rootSub: Subscription
    homeForm: FormGroup
    image : string

    constructor( private formBuilder: FormBuilder ) {}

    ngOnInit() {

        if (this.rootSub)
            this.rootSub.unsubscribe()

        this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.callRoot()
                this.printForm()
            })
        })
    }

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root) => {
            this.root = root
        })
    }

    printForm() {
        MeteorObservable.call('editOrAddHome').subscribe((home) => {
            if (home)
                this.editForm(home)
        }, () => {
            this.addForm()
        })
    }

    editForm(home) {
        if (home) {
            this.image = home.banner
            this.homeForm = this.formBuilder.group({
                banner_image: [home.banner],
                welcome_lang: [home.welcome[0].lang, Validators.required],
                welcome_message: [home.welcome[0].message, Validators.required]
            })
        }
    }

    addForm() {
        this.homeForm = this.formBuilder.group({
            banner_image: [''],
            welcome_lang: ['en', Validators.required],
            welcome_message: ['', Validators.required]
        })
    }

    addHome() {
        if (this.homeForm.valid) {
            MeteorObservable.call('homeDetail', this.homeForm.value, this.image).subscribe(() => {
                alert('Successful update')
            }, (err) => {
                alert(`Cannot update home cause ${err}`)
            })
            this.homeForm.reset()
        }
    }

    onImage(imageId: string) {
        this.image = imageId
    }

    ngOnDestroy() {
        if (this.rootSub)
            this.rootSub.unsubscribe()
    }
}
