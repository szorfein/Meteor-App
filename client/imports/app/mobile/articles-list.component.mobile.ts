import { Component, NgZone } from '@angular/core'
import { ArticlesList } from '../shared-components/articles-list.class'

import template from './articles-list.component.mobile.html'

@Component({
    selector: 'articles-list',
    template
})

export class ArticlesListMobileComponent extends ArticlesList {

    constructor(zone: NgZone) {
        super(zone)
    }
}
