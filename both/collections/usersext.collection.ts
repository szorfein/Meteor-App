import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { UserExt } from '/both/models/userext.model'
import { isLogged } from '/lib/users'

export const UsersExt = new MongoObservable.Collection<UserExt>('usersext')

const newroot = UsersExt.findOne({ 'admin': true })

function isRoot() {
    console.log('newroot exist in root ? 1 ' + !!newroot.idOwner)
    console.log('newroot exist in root ? 2 ' + newroot.idOwner)
    console.log('newroot exist in root ? 3 ' + !!newroot)
    console.log('newroot exist in root ? 4 ' + newroot)
    console.log('User is root ? -> ' + !!(newroot.idOwner === Meteor.userId()))
    if (!newroot) return false
        else
            return newroot.idOwner === Meteor.userId()
}

UsersExt.allow({
    insert: isRoot,
    update: function(userId, doc) {
        return newroot.idOwner === userId
    },
    remove: function(userId, doc) {
        return newroot.idOwner === userId
    }
})
