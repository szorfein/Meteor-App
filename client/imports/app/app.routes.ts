import { Route } from '@angular/router'
import { Meteor } from 'meteor/meteor'

import { ArticlesListComponent } from './articles/articles-list.component'
import { ArticleDetailsComponent } from './articles/article-details.component'
import { AboutComponent } from './about/about-component'
import { IndexComponent } from './index/index.component'
import { ContactComponent } from './contact/contact.component'
import { TagDetailComponent } from './tags/tag-detail.component'
import { UserDetailsComponent } from './user/user-details.component'

export const routes: Route[] = [
    { path: '', component: IndexComponent },
    { path: 'blog', component: ArticlesListComponent },
    { path: 'blog/:articleId', component: ArticleDetailsComponent },
    { path: 'blog/category/:tagName', component: TagDetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'user/:userName', component: UserDetailsComponent }
    //{ path: 'user/:userName', component: UserDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
]

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
}]
