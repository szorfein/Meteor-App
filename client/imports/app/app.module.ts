import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountsModule } from 'angular2-meteor-accounts-ui'

import { AppComponent } from './app.component'
import { routes, ROUTES_PROVIDERS } from './app.routes'
import { SidebarComponent } from './sidebar/sidebar.component'

import { ARTICLES_DECLARATIONS } from './articles'
import { HEADER_DECLARATIONS } from './header'
import { FOOTER_DECLARATIONS } from './footer'
import { TAGS_DECLARATIONS } from './tags'
import { COMMENTS_DECLARATIONS } from './comments'
import { USERS_DECLARATIONS } from './user'
import { AUTH_DECLARATIONS } from './auth'
import { CONTACT_DECLARATIONS } from './contact'
import { ABOUT_DECLARATIONS } from './about'
import { INDEX_DECLARATIONS } from './index'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        AccountsModule
    ],
    declarations: [
        AppComponent,
        SidebarComponent,
        ...COMMENTS_DECLARATIONS,
        ...ARTICLES_DECLARATIONS,
        ...HEADER_DECLARATIONS,
        ...FOOTER_DECLARATIONS,
        ...USERS_DECLARATIONS,
        ...TAGS_DECLARATIONS,
        ...AUTH_DECLARATIONS,
        ...CONTACT_DECLARATIONS,
        ...ABOUT_DECLARATIONS,
        ...INDEX_DECLARATIONS
    ],
    providers: [
        ...ROUTES_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
