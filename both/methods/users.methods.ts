import { UsersExt } from '/both/collections/usersext.collection'
import { UserExt } from '/both/models/userext.model'
import { User, RegisterUser, UserBar } from '/both/models/user.model'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

function isRoot(userId: string):boolean {
    let user = UsersExt.collection.findOne({ $and: [ { 'idOwner': userId, 
                                               'admin': true } ] })
    return !!user
}

Meteor.methods({

    userInfoBar: function() {
        let userBar : UserBar

        if (!this.userId)
            return

        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            userBar = userLib.findUserInfoBar(this.userId)
        }

        return userBar
    },
    createNewNinja: function(newNinja: RegisterUser) {
        check(newNinja.email, String)
        check(newNinja.password, String)
        check(newNinja.username, String)

        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            if (userLib.isAlrealyRegister(newNinja))
                throw new Meteor.Error('301', 'Address or Name alrealy exist')
        }
    }
})
