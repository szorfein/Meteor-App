import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { C0mment } from '/both/models/comment.model'
import { isLogged } from '/lib/users'

export const Comments = new MongoObservable.Collection<C0mment>('comments')

Comments.allow({
    insert: isLogged,
    update: isLogged,
    remove: isLogged
})
