import { Analytic } from '/both/models/analytics.model'
import { MongoObservable } from 'meteor-rxjs'
import { isRoot } from '/lib/users'

export const Analytics = new MongoObservable.Collection<Analytic>('analytics')

/*
Analytics.allow({
    insert: function(userId: string) {
        return isRoot(userId)
    },
    update: function(userId: string) {
        return isRoot(userId)
    },
    remove: function(userId: string) {
        return isRoot(userId)
    }
})
*/
