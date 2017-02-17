import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { HomeDetail } from '/both/models/extra.model'
import template from './index-form.component.html'

@Component({
    selector: 'index-form',
    template
})

export class IndexFormComponent implements OnInit {

    homeForm: FormGroup
    image : string

    constructor( private formBuilder: FormBuilder ) {}

    ngOnInit() {
        this.printForm()
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
                welcome_lang: [home.welcome[0].lang],
                welcome_title: [home.welcome[0].title],
                welcome_message: [home.welcome[0].message]
            })
        }
    }

    addForm() {
        this.homeForm = this.formBuilder.group({
            banner_image: [''],
            welcome_lang: ['en'],
            welcome_title: [''],
            welcome_message: ['']
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
}
