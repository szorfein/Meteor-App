import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { name, forceMail } from '/lib/validate'
import template from './contact-form.component.html'

@Component({
    selector: 'contact-form',
    template
})

export class ContactFormComponent implements OnInit {

    captchaRes : boolean = false
    contactForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.printForm()
    }

    private printForm() {
        this.contactForm = this.formBuilder.group({
            name: ['', name],
            email: ['', forceMail],
            phone: ['', Validators.required],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        })
    }

    addPost() {
        if (this.contactForm.valid && this.captchaRes) {
            MeteorObservable.call('addContact', this.contactForm.value).subscribe(() => {
                alert('Your message has been send')
            }, (err) => {
                alert(`Cannot send message cause ${err}`)
            })
            this.contactForm.reset()
        }
    }

    handleResult(res) {
        this.captchaRes = res
    }
}
