import { Component, Input, OnInit } from '@angular/core'
import { Article } from '/both/models/article.model'
import template from './display-article-list.component.html'

enum Display {
    card , inline , blog
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
    inline : string = 'inline'

    constructor() {}

    ngOnInit() {
        this.setDisplay()
    }

    private setDisplay() {
        if (this.display == Display[0]) {
            this.cardDisplay = true
        } else if (this.display == Display[1]) {
            this.inlineDisplay = true
        } else if (this.display == Display[2]) {
            this.blogDisplay = true
        }
    }
}
