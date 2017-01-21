import { Component } from '@angular/core'
import { PaginationService } from 'ng2-pagination'
import { ArticlesList } from '../shared-components/articles-list.class'

import template from './articles-list.component.mobile.html'

@Component({
    selector: 'articles-list',
    template
})

export class ArticlesListMobileComponent extends ArticlesList {

    constructor( paginationService: PaginationService ) {
        super( paginationService )
    }
}
