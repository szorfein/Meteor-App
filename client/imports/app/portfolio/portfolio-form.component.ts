import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { imgurLink } from '/lib/validate'
import template from './portfolio-form.component.html'

@Component({
    selector: 'portfolio-form',
    template
})

export class PortfolioFormComponent implements OnInit {

    linkForm : FormGroup

    constructor(private formBuilder : FormBuilder) {}

    ngOnInit() {
        this.printForm()
    }

    printForm() {
        this.linkForm = this.formBuilder.group({
            link: ['', imgurLink]
        })
    }

    validForm() {
        if (this.linkForm.valid) {
            MeteorObservable.call('addPortfolioLink', this.linkForm.value.link).subscribe(() => {
                alert('Register link complete')
                this.linkForm.reset()
            }, (err) => {
                alert(`Cannot add link cause ${err}`)
            })
        }
    }
}
