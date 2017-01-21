import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription, Observable } from 'rxjs'
import { getIndex } from '/lib/index'
import template from './contact-form.component.html'

@Component({
    selector: 'contact-form',
    template
})

export class ContactFormComponent implements OnInit, OnDestroy {

    captcha
    captchaForm
    captchaSub : Subscription
    captchaClick : boolean = false
    contactForm: FormGroup
    indexSub : Subscription

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.indexSub = MeteorObservable.subscribe('indexCaptcha').subscribe()

        if (this.captchaSub)
            this.captchaSub.unsubscribe()

        this.captchaSub = MeteorObservable.subscribe('captcha', 'en').subscribe(() => {
            this.getCaptcha()
        })
    }

    getCaptcha() {
        let getCount = getIndex('captchaId')
        MeteorObservable.call('secretCaptcha', getCount).subscribe((captcha) => {
            this.captcha = captcha
            this.printForm()
        }, (err) => {
            alert(`Cannot create captcha cause ${err}`)
        })
    }

    onClickCaptcha() {
        if (this.captchaClick)
            this.captchaClick = false
        else
            this.captchaClick = true
    }

    printForm() {
        if (this.captcha) {
            this.contactForm = this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', Validators.required],
                phone: ['', Validators.required],
                subject: ['', Validators.required],
                message: ['', Validators.required],
                captcha: ['', Validators.required]
            })
        }
    }

    addPost() {
        this.captchaForm = { question: this.captcha.question, 
            response : this.contactForm.value.captcha }
        if (this.contactForm.valid) {
            MeteorObservable.call('addContact', this.contactForm.value, this.captcha, this.captchaForm).subscribe(() => {
                alert('Your message has been send')
            }, (err) => {
                alert(`Cannot send message cause ${err}`)
                this.getCaptcha()
            })
            this.contactForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.indexSub)
            this.indexSub.unsubscribe()

        if (this.captchaSub)
            this.captchaSub.unsubscribe()
    }
}
