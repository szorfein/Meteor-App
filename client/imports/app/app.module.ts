import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountsModule } from 'angular2-meteor-accounts-ui'

import { AppComponent } from './app.component'
import { routes, ROUTES_PROVIDERS } from './app.routes'
import { AboutComponent } from './about/about-component'
import { IndexComponent } from './index/index.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { ContactComponent } from './contact/contact.component'
import { UserDetailsComponent } from './user/user-details.component'

import { ARTICLES_DECLARATIONS } from './articles'
import { HEADER_DECLARATIONS } from './header'
import { FOOTER_DECLARATIONS } from './footer'
import { TAGS_DECLARATIONS } from './tags'
import { COMMENTS_DECLARATIONS } from './comments'

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
        IndexComponent,
        AboutComponent,
        SidebarComponent,
        ContactComponent,
        UserDetailsComponent,
        ...COMMENTS_DECLARATIONS,
        ...ARTICLES_DECLARATIONS,
        ...HEADER_DECLARATIONS,
        ...FOOTER_DECLARATIONS,
        ...TAGS_DECLARATIONS
    ],
    providers: [
        ...ROUTES_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
