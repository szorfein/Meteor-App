import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { ARTICLES_DECLARATIONS } from './articles'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        ...ARTICLES_DECLARATIONS
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
