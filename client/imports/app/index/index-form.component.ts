import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { HomeDetail } from '/both/models/extra.model'
import { retLang } from '/lib/lang'
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
                imageBanner: [this.image],
                lang: ['en'],
                title: [home.lang[retLang('en')].title],
                message: [home.lang[retLang('en')].message]
            })
        }
    }

    addForm() {
        this.homeForm = this.formBuilder.group({
            imageBanner: [''],
            lang: ['en'],
            title: [''],
            message: ['']
        })
    }

    addHome() {
        if (this.homeForm.valid) {
            MeteorObservable.call('homeDetail', this.homeForm.value, this.image).subscribe(() => {
                alert('Successful update')
            }, (err) => {
                alert(`Cannot update home cause ${err}`)
            })
        }
    }

    onImage(imageId: string) {
        this.image = imageId
    }
}
