import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'

import 'rxjs/add/operator/map'

import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'

import template from './tag.component.html'
import style from './tag.component.scss'

@Component({
    selector: 'tag-main',
    template,
    styles: [style]
})

export class TagComponent implements OnInit, OnDestroy { 
    tags: Observable<Tag[]>
    tagsSub: Subscription

    _stringify = JSON.stringify;
    bleeding = function (value, ...args) {
        if (args.length) {
            return this._stringify(value, ...args);
        } else {
            return this._stringify(value, function (key, value) {
                if (value && key === 'zone' && value['_zoneDelegate'] 
                    && value['_zoneDelegate']['zone'] === value) {
                        return undefined;
                    }
                    return value;
            });
        }
    }

    ngOnInit() {
        this.tags = Tags.find({}).zone()
        this.tagsSub = MeteorObservable.subscribe('tags').subscribe()
        //console.log('Tags : ' + this.bleeding(this.tags))
    }

    ngOnDestroy() {
    }
}
