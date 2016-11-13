import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountsModule } from 'angular2-meteor-accounts-ui'

import { AppComponent } from './app.component'
import { routes } from './app.routes'
import { ROUTES_PROVIDERS } from './app.routes'
import { AboutComponent } from './about/about-component'
import { IndexComponent } from './index/index.component'
import { SidebarComponent } from './sidebar/sidebar.component'

import { ARTICLES_DECLARATIONS } from './articles'
import { HEADER_DECLARATIONS } from './header'
import { FOOTER_DECLARATIONS } from './footer'

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
        ...ARTICLES_DECLARATIONS,
        ...HEADER_DECLARATIONS,
        ...FOOTER_DECLARATIONS
    ],
    providers: [
        ...ROUTES_PROVIDERS
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
