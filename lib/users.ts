import { Meteor } from 'meteor/meteor'
import { UsersExt } from '/both/collections/usersext.collection'

export function isLogged() {
    return !!Meteor.user()
}

export function isRoot(userid: string):boolean {
    let newroot = UsersExt.findOne({ 'admin': true })
    if (newroot)
        return newroot.idOwner === userid
    else
        return false
}
