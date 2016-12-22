import { Component, NgZone } from '@angular/core'
import { ArticlesList } from '../shared-components/articles-list.class'
import { PaginationService } from 'ng2-pagination'

import template from './articles-list.component.mobile.html'

@Component({
    selector: 'articles-list',
    template
})

export class ArticlesListMobileComponent extends ArticlesList {

    constructor( zone: NgZone, paginationService: PaginationService ) {
        super( zone, paginationService )
    }
}
