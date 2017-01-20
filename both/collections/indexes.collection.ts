import { MongoObservable } from 'meteor-rxjs'
import { Index } from '/both/models/index.model'
import { isLogged } from '/lib/users'

export const Indexes = new MongoObservable.Collection<Index>('indexes')

Indexes.allow({
    insert: function(userId: string) {
        return isLogged()
    },
    update: function(userId: string) {
        return isLogged()
    },
    remove: function(userId: string) {
        return isLogged()
    }
})
