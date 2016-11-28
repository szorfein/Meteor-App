import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { UserExt } from '/both/models/user.model'
import { isLogged } from '/lib/users'

export const UsersExt = new MongoObservable.Collection<UserExt>('usersext')

UsersExt.allow({
    insert: isLogged,
    update: isLogged,
    remove: isLogged 
})
