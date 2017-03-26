import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountsModule } from 'angular2-meteor-accounts-ui'
import { Ng2PaginationModule } from 'ng2-pagination'
import { ChartsModule } from 'ng2-charts'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component.web'
import { routes, ROUTES_PROVIDERS } from './app.routes'
import { FileDropModule } from 'angular2-file-drop'

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
import { UPLOAD_DECLARATIONS } from './uploads'
import { SHARED_DECLARATIONS } from './shared'
import { ROOT_DECLARATIONS } from './root'
import { MODAL_DECLARATIONS } from './modal'
import { STATISTICS_DECLARATIONS } from './statistics'
import { PORTFOLIO_DECLARATIONS } from './portfolio'
import { SITEMAP_DECLARATIONS } from './sitemap'
import { SHARED_COMPONENTS_DECLARATIONS } from './shared-components'

import { MOBILE_DECLARATIONS } from './mobile'
import { AppMobileComponent } from './mobile/app.component.mobile'
import { IonicModule, IonicApp } from 'ionic-angular'
import { ArticlesListMobileComponent } from './mobile/articles-list.component.mobile'

import { ImgurService } from './portfolio/imgur.service'

let moduleDefinition

if (Meteor.isCordova) {
    moduleDefinition = {
        imports: [
            Ng2PaginationModule,
            IonicModule.forRoot(AppMobileComponent)
        ],
        declarations: [
            ...SHARED_DECLARATIONS,
            ...MOBILE_DECLARATIONS
        ],
        providers: [
        ],
        bootstrap: [
            IonicApp
        ],
        entryComponents: [
            ArticlesListMobileComponent
        ]
    }
} else {
    moduleDefinition = {
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forRoot(routes),
            AccountsModule,
            Ng2PaginationModule,
            FileDropModule,
            ChartsModule,
            HttpModule
        ],
        declarations: [
            AppComponent,
            ...SHARED_DECLARATIONS,
            ...COMMENTS_DECLARATIONS,
            ...ARTICLES_DECLARATIONS,
            ...HEADER_DECLARATIONS,
            ...FOOTER_DECLARATIONS,
            ...USERS_DECLARATIONS,
            ...TAGS_DECLARATIONS,
            ...AUTH_DECLARATIONS,
            ...CONTACT_DECLARATIONS,
            ...ABOUT_DECLARATIONS,
            ...INDEX_DECLARATIONS,
            ...UPLOAD_DECLARATIONS,
            ...ROOT_DECLARATIONS,
            ...MODAL_DECLARATIONS,
            ...STATISTICS_DECLARATIONS,
            ...PORTFOLIO_DECLARATIONS,
            ...SITEMAP_DECLARATIONS,
            ...SHARED_COMPONENTS_DECLARATIONS
        ],
        providers: [
            ...ROUTES_PROVIDERS,
            ImgurService
        ],
        bootstrap: [
            AppComponent
        ]
    }
}

@NgModule(moduleDefinition)

export class AppModule {}
