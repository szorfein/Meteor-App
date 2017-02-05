import { Component, Input } from '@angular/core'
import template from './modal-article-add.component.html'

@Component({
    selector: 'modal-article-add',
    template
})

export class ModalArticleAddComponent {
    @Input() article
    constructor() {}
}
