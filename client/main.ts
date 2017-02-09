import 'angular2-meteor-polyfills'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './imports/app/app.module'
import { Meteor } from 'meteor/meteor'

import '/both/methods/users.methods'
import '/both/methods/articles.methods'
import '/both/methods/captcha.methods'
import '/both/methods/analytics.methods'
import '/both/methods/portfolio.methods'

import ionicSelector from 'ionic-selector'

function setClass(css:string):void {
    if (!document.body.className) {
        document.body.className = ""
    }
    document.body.className += " " + css
}

Meteor.startup(() => {

    if (Meteor.isCordova) {
        ionicSelector('app')
        setClass('mobile')
    } else
        setClass('web')

    const platform = platformBrowserDynamic()
    platform.bootstrapModule(AppModule)
})
