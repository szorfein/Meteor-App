import { Component, Input, OnInit } from '@angular/core'
import { C0mment } from '/both/models/comment.model'
import { Subscription } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './comment-display.component.html'

@Component({
    selector: 'display-comment',
    template
})

export class CommentDisplayComponent implements OnInit {
    @Input() comment : C0mment
    imageSub : Subscription
    usersSub : Subscription

    constructor() {}

    ngOnInit() {
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.usersSub = MeteorObservable.subscribe('userbar').subscribe()
    }
}
