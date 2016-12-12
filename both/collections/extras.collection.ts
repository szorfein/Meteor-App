import { MongoObservable } from 'meteor-rxjs'
import { Extra } from '/both/models/extra.model'
import { isRoot } from '/lib/users'

export const Extras = new MongoObservable.Collection<Extra>('extras')
Extras.allow({
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
