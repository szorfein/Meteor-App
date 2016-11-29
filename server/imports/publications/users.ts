import { Meteor } from 'meteor/meteor'
import { UsersExt } from '/both/collections/users.collection'
import { check } from 'meteor/check'

Meteor.publish('userprofile', function(userName: string) {
    return UsersExt.find(buildQuery.call(this, userName))
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
