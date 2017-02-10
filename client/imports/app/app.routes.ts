import { Route } from '@angular/router'
import { Meteor } from 'meteor/meteor'

import { PortfolioListComponent } from './portfolio/portfolio-list.component'
import { PortfolioDetailComponent } from './portfolio/portfolio-detail.component'
import { ArticlesListComponent } from './articles/articles-list.component'
import { ArticleDetailsComponent } from './articles/article-details.component'
import { AboutComponent } from './about/about.component'
import { IndexComponent } from './index/index.component'
import { ContactComponent } from './contact/contact.component'
import { UserDetailsComponent } from './user/user-details.component'
import { LoginComponent } from './auth/login.component'
import { SignupComponent } from './auth/signup.component'
import { RecoverComponent } from './auth/recover.component'

export const routes: Route[] = [
    { path: '', component: IndexComponent },
    { path: 'portfolio', component: PortfolioListComponent },
    { path: 'portfolio/:id', component: PortfolioDetailComponent },
    { path: 'blog', component: ArticlesListComponent },
    { path: 'blog/:articleId', component: ArticleDetailsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'user/:userName', component: UserDetailsComponent, 
        canActivate: ['canActivateForLoggedIn'] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'recover', component: RecoverComponent }
]

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
}]
