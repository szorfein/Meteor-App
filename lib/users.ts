import { Meteor } from 'meteor/meteor'
import { Users, UsersExt } from '/both/collections/users.collection'

export function isLogged() {
    return !!Meteor.user()
}

export function isRoot(userid : string):boolean {
    const root = UsersExt.findOne({ $and: [
        { 'admin': true },
        { 'isPublic': false }
    ]})

    console.log('Is Root ?? ' + !!(root.idOwner == userid))
    return !!(root.idOwner == userid)
}

export function isOwner(userId : string):boolean {
    let user = Users.findOne(userId)
    return !!user
}
