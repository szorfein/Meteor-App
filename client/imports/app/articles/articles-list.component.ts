import { Component } from '@angular/core'
import { PaginationService } from 'ng2-pagination'
import { ArticlesList } from '../shared-components/articles-list.class'

import template from './articles-list.component.html'
import style from './articles-list.component.scss'

@Component({
    selector: 'articles-list',
    template,
    styles: [style]
})

export class ArticlesListComponent extends ArticlesList {

    constructor(paginationService: PaginationService) {
        super(paginationService)
    }
}
