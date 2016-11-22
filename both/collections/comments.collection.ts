import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { C0mm3nt } from '/both/models/comment.model'
import { isLogged } from '/lib/users'

export const C0mm3nts = new MongoObservable.Collection<C0mm3nt>('c0mm3nts')

C0mm3nts.allow({
    insert: isLogged,
    update: isLogged,
    remove: isLogged
})
