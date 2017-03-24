import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import { Subscription } from 'rxjs'
import { Article } from '/both/models/article.model'
import { Users } from '/both/collections/users.collection'
import { User } from '/both/models/user.model'
import template from './article-panel.component.html'

@Component({
    selector: 'article-panel',
    template
})

export class ArticlePanelComponent implements OnInit, OnDestroy {
    @Input() article : Article
    root : User
    rootSub : Subscription

    constructor() {}

    ngOnInit() {
        this.kill()
        this.callRoot()
    }

    private kill() {
        if (this.rootSub) 
            this.rootSub.unsubscribe()
    }

    private callRoot() {
        this.rootSub = MeteorObservable.subscribe('root').subscribe(() => {
            this.root = Users.find()
        })
    }

    remove() {
        if (this.article && this.root) {
            MeteorObservable.call('remArticle', this.article._id).subscribe(() => {
                console.log('article ' +this.article._id+ ' has been delete')
            }, (err) => { alert(`Error cause ${err}`) })
        }
    }

    ngOnDestroy() {
        this.kill()
    }
}
