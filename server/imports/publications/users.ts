import { Meteor } from 'meteor/meteor'
import { User } from '/both/models/user.model'
import { Users } from '/both/collections/users.collection'
import { UsersExt } from '/both/collections/usersext.collection'
import { check } from 'meteor/check'
import { MeteorObservable } from 'meteor-rxjs'

Meteor.publish('userprofile', function(userName: string) {
    return UsersExt.find(buildQuery.call(this, userName))
})

Meteor.publish('userinfo', function() {
    return Users.find({ '_id': this.userId })
})

Meteor.publish('userbar', function() {
    let userext = UsersExt.find({ 'idOwner': this.userId })

    if (!userext)
        throw new Meteor.Error('404', 'User no found')

    return UsersExt.find({ 'idOwner': this.userId })
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
