import { Meteor } from 'meteor/meteor'
import { Users, UsersExt } from '/both/collections/users.collection'

export function isLogged() {
    return !!Meteor.user()
}

export function isRoot(userid: string):boolean {
    let newroot = UsersExt.findOne({ $and: [
        { 'admin': true },
        { 'isPublic': false }
    ]})

    return !!(newroot.idOwner === userid)
}

export function isOwner(userId: string):boolean {
    let user = Users.findOne(userId)
    return !!user
}
