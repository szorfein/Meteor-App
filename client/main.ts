import 'angular2-meteor-polyfills'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './imports/app/app.module'
import { Meteor } from 'meteor/meteor'

import '/both/methods/users.methods'

import ionicSelector from 'ionic-selector'

function setClass(css:string):void {
    if (!document.body.className) {
        document.body.className = ""
    }
    document.body.className += " " + css
}

Meteor.startup(() => {

    console.log('Is Meteor.isCordova ? ' + Meteor.isCordova)
    if (Meteor.isCordova) {
        ionicSelector('app')
        setClass('mobile')
    } else
        setClass('web')

    const platform = platformBrowserDynamic()
    platform.bootstrapModule(AppModule)
})
