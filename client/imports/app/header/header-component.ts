import { Component, OnInit, OnDestroy } from '@angular/core'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Subscription } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { CookieService } from 'angular2-cookie/core'
import { isLang } from '/lib/validate'
import template from './header-component.html'

@Component({
    selector: 'header-main',
    template
})

@InjectUser('user')
export class HeaderComponent implements OnInit, OnDestroy {

    domain : string
    domainSub : Subscription
    social : string = 'social'
    inline : string = 'inline'

    constructor(private _cookieService : CookieService) {}

    ngOnInit() {
        this.callDomainName()
    }

    private callDomainName() {
        this.domainSub = MeteorObservable.subscribe('pubAbout').subscribe(() => {
            MeteorObservable.call('domainName').subscribe((dd : string) => {
                this.domain = dd
            }, () => {})
        })
    }

    cookieLang(key : string) {
        if (isLang(key))
            this._cookieService.put('language', key)
    }

    ngOnDestroy() {
        if (this.domainSub)
            this.domainSub.unsubscribe()
    }
}

