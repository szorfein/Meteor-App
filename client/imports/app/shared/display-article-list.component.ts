import { Component, Input, OnInit } from '@angular/core'
import { Article } from '/both/models/article.model'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { retLang } from '/lib/lang'
import { isLang } from '/lib/validate'
import { CookieService } from 'angular2-cookie/core'
import template from './display-article-list.component.html'

enum Display {
    card , inline , blog , thumbnail
}

@Component({
    selector: 'display-article-list',
    template
})

export class DisplayArticleList implements OnInit {
    @Input() article : Article
    @Input() display : string
    cardDisplay : boolean = false
    inlineDisplay : boolean = false
    blogDisplay : boolean = false
    thumbnailDisplay : boolean = false
    inline : string = 'inline'
    userSub : Subscription
    lang : any

    constructor(private _cookieService : CookieService) {}

    ngOnInit() {
        this.loadLang()
        this.userSub = MeteorObservable.subscribe('user').subscribe()
        this.setDisplay()
        this.getCookie()
    }

    private loadLang() {
        MeteorObservable.call('selectLang').subscribe((lang : string) => {
            let cookie : string = this.getCookie()
            let inLang : number = cookie ? retLang(cookie) : retLang(lang)
            if (this.article.lang[inLang]) {
                this.lang = this.article.lang[inLang]
            } else {
                this.lang = this.article.lang[0]
            }
        })
    }

    private setDisplay() {
        if (this.display == Display[0]) {
            this.cardDisplay = true
        } else if (this.display == Display[1]) {
            this.inlineDisplay = true
        } else if (this.display == Display[2]) {
            this.blogDisplay = true
        } else if (this.display == Display[3]) {
            this.thumbnailDisplay = true
        }
    }

    private getCookie() {
        let s : string = this._cookieService.get('language')
        if (isLang(s))
            return s
        else
            return ''
    }
}
