import { Analytic, BrowserWeb } from '/both/models/analytics.model'
import { MongoObservable } from 'meteor-rxjs'
import { isRoot } from '/lib/users'

export const Analytics = new MongoObservable.Collection<Analytic>('analytics')
export const BrowsersWeb = new MongoObservable.Collection<BrowserWeb>('browserweb')

Analytics.allow({
    insert: function(userId: string) {
        console.log('will insert analytics')
        return isRoot(userId)
    },
    update: function(userId: string) {
        return isRoot(userId)
    },
    remove: function(userId: string) {
        return isRoot(userId)
    }
})

BrowsersWeb.allow({
    remove: function(userId: string) {
        return isRoot(userId)
    }
})
