import { Route } from '@angular/router'

import { ArticlesListComponent } from './articles/articles-list.component'
import { ArticleDetailsComponent } from './articles/article-details.component'
import { AboutComponent } from './about/about-component'
import { IndexComponent } from './index/index.component'

export const routes: Route[] = [
    { path: '', component: IndexComponent },
    { path: 'blog', component: ArticlesListComponent },
    { path: 'blog/:articleId', component: ArticleDetailsComponent },
    { path: 'about', component: AboutComponent }
]
