import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import 'rxjs/add/operator/map'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import template from './tag.component.html'

@Component({
    selector: 'tag-main',
    template
})

export class TagComponent implements OnInit, OnDestroy { 
    tags: Observable<Tag[]>
    tag: string
    tagsSub: Subscription
    @Output() tagSelect : EventEmitter<string> = new EventEmitter<string>()

    ngOnInit() {
        this.tagsSub = MeteorObservable.subscribe('tags').subscribe(() => {
            this.tags = Tags.find({}).zone()
        })
    }

    tagSelected(tag) {
        if (tag)
            this.tagSelect.emit(tag)
    }

    ngOnDestroy() {
        this.tagsSub.unsubscribe()
    }
}
