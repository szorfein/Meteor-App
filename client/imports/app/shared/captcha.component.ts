import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Captcha, SecretCaptcha } from '/both/models/captcha.model'
import { MeteorObservable } from 'meteor-rxjs'
import template from './captcha.component.html'

@Component({
    selector: 'captcha',
    template
})

export class CaptchaComponent implements OnInit, OnDestroy {
    @Output() complete = new EventEmitter()
    isComplete : boolean = false
    captchaForm : FormGroup
    captcha : SecretCaptcha
    captchaSub : Subscription
    captchaIndexSub : Subscription

    constructor(private formBuilder : FormBuilder) {}

    ngOnInit() {
        this.kill()
        this.captchaIndexSub = MeteorObservable.subscribe('indexCaptcha').subscribe()
        this.captchaSub = MeteorObservable.subscribe('captcha', 'en').subscribe(() => {
            this.getCaptcha()
        })
    }

    private getCaptcha() {
        MeteorObservable.call('secretCaptcha').subscribe((captcha : SecretCaptcha) => {
            this.captcha = captcha
            this.printForm()
        }, (err) => {
            alert(`Cannot create captcha cause ${err}`)
        })
    }

    private printForm() {
        if (this.captcha) {
            this.captchaForm = this.formBuilder.group({
                response: ['', Validators.required]
            })
        }
    }

    public finishForm() {
        if (this.captchaForm.valid && !this.isComplete) {
            MeteorObservable.call('validCaptcha', this.captcha, this.captchaForm.value.response).subscribe(() => {
                this.isComplete = true
                this.complete.emit(this.isComplete)
                this.captchaForm.reset()
                console.log('Captcha success')
            }, (err) => {
                alert(`Error with captcha -> ${err}`)
                this.captchaForm.reset()
                this.getCaptcha()
            })
        }
    }

    private kill() {
        if (this.captchaIndexSub) {
            this.captchaIndexSub.unsubscribe()
        }
        if (this.captchaSub) {
            this.captchaSub.unsubscribe()
        }
    }

    ngOnDestroy() {
        this.kill()
    }
}
