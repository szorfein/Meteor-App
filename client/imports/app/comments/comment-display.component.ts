import { Component, Input } from '@angular/core'
import { C0mment } from '/both/models/comment.model'
import template from './comment-display.component.html'

@Component({
    selector: 'display-comment',
    template
})

export class CommentDisplayComponent {
    @Input() comment : C0mment

    constructor() {}
}
