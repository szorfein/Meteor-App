import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Meteor } from 'meteor/meteor'
import template from './contact-form.component.html'

@Component({
    selector: 'contact-form',
    template
})

export class ContactFormComponent implements OnInit {

    contactForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.printForm()
    }

    printForm() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        })
    }

    addPost() {
        if (this.contactForm.valid) {
            MeteorObservable.call('addContact', this.contactForm.value).subscribe(() => {
                alert('Youre message has been send')
            }, (err) => {
                alert(`Cannot send message cause ${err}`)
            })
            this.contactForm.reset()
        }
    }
}
