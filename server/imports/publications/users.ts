import { Meteor } from 'meteor/meteor'
import { User } from '/both/models/user.model'
import { Users, UsersExt } from '/both/collections/users.collection'
import { userLib } from '/lib/server/user'
import { check } from 'meteor/check'

Meteor.publish('userprofile', function(userName: string) {
    return UsersExt.find(buildQuery.call(this, userName))
})

Meteor.publish('root', function() {
    if (userLib.isAdmin(this.userId)) {
        return UsersExt.find({'idOwner': this.userId},{skip:0,limit:1})
    }
})

Meteor.publish('user', function() {
    return Users.find({},{skip:0,limit:1})
})

Meteor.publish('lastRegistered', function() {
    if (!this.userId)
        return

    return Users.find({},{skip:0,limit:3})
})

function buildQuery(userName: string) {
    check(userName, String)
    const validator = {
        $and: [ 
            { 'idOwner': this.userId }, 
            { 'idOwner': { $exists: true } },
            { 'name': userName }
        ] 
    }
    return validator
}
