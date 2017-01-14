import { User, RegisterUser, UserBar } from '/both/models/user.model'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

Meteor.methods({

    userAdmin: function() {
        let ninja : UserBar
        if (!this.userId) {
            return
        }
        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            ninja = userLib.findUserInfoBar(this.userId)
            if (!userLib.returnAdmin(this.userId))
                throw new Meteor.Error('404', 'Not authorize')
        }
        return ninja
    },
    userInfoBar: function() {
        let userBar : UserBar
        if (!this.userId) {
            return
        }
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
