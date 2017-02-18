import { Component } from '@angular/core'
import template from './article-sidebar.component.html'

@Component({
    selector: 'sidebar',
    template
})

export class ArticleSidebarComponent {
    sidebarM : string = 'sidebar'
    constructor() {}
}
