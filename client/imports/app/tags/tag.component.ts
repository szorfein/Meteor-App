import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import 'rxjs/add/operator/map'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import template from './tag.component.html'

enum Display {
    block , inline 
}

@Component({
    selector: 'tag-main',
    template
})

export class TagComponent implements OnInit, OnDestroy { 
    @Input() display : string
    tags: Observable<Tag[]>
    tag: string
    tagsSub: Subscription
    displayBlock : boolean = false
    displayInline : boolean = false
    @Output() tagSelect : EventEmitter<string> = new EventEmitter<string>()

    ngOnInit() {
        this.loadDisplay()
        this.tagsSub = MeteorObservable.subscribe('tags').subscribe(() => {
            this.tags = Tags.find({}).zone()
        })
    }

    private loadDisplay() {
        if (this.display == 'bloc')
            this.displayBlock = true
        else
            this.displayInline = true
    }

    tagSelected(tag) {
        if (tag)
            this.tagSelect.emit(tag)
    }

    ngOnDestroy() {
        this.tagsSub.unsubscribe()
    }
}
