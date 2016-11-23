import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { Tag } from '/both/models/tag.model'
import { isLogged } from '/lib/users'

export const Tags = new MongoObservable.Collection<Tag>('tags')

Tags.allow({
    insert: isLogged,
    update: isLogged,
    remove: isLogged 
})
