import { Route } from '@angular/router'

import { ArticlesListComponent } from './articles/articles-list.component'
import { ArticleDetailsComponent } from './articles/article-details.component'
import { AboutComponent } from './about/about-component'

export const routes: Route[] = [
    { path: '', component: ArticlesListComponent },
    { path: 'article/:articleId', component: ArticleDetailsComponent },
    { path: 'about', component: AboutComponent }
]
