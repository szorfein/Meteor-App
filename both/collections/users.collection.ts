import { Meteor } from 'meteor/meteor'
import { MongoObservable } from 'meteor-rxjs'
import { UserExt } from '/both/models/user.model'
import { isLogged, isRoot, isOwner } from '/lib/users'

export const Users = MongoObservable.fromExisting(Meteor.users)
export const UsersExt = new MongoObservable.Collection<UserExt>('usersext')

UsersExt.allow({
    insert: function(userId) {
        return isOwner(userId)
    },
    update: function(userId, doc) {
        return isOwner(userId)
    },
    remove: function(userId, doc) {
        return isRoot(userId)
    }
})
