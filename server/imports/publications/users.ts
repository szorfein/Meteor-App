import { Meteor } from 'meteor/meteor'
import { User } from '/both/models/user.model'
import { Users, UsersExt } from '/both/collections/users.collection'
import { check } from 'meteor/check'

Meteor.publish('userprofile', function(userName: string) {
    return UsersExt.find(buildQuery.call(this, userName))
})

Meteor.publish('userbar', function() {
    return Users.find({ _id : this.userId },{ skip:0, limit:1 })
})

Meteor.publish('root', function() {
    let root = UsersExt.findOne({ 
        $and: [
            { 'idOwner': this.userId },
            { 'name': { $exists: true }},
            { 'admin': true },
            { 'isPublic': false }
        ]
    })

    if (!root) 
        return

    if (root.idOwner === this.userId) {
        return UsersExt.find({
            $and: [
                { 'idOwner': this.userId },
                { 'admin': true }
            ]
        },{skip:0,limit:1})
    }
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
