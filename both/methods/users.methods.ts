import { User, RegisterUser, UserBar } from '/both/models/user.model'
import { check } from 'meteor/check'

Meteor.methods({

    userAdmin: function() {
        let ninja : UserBar
        if (Meteor.isServer) {
            if (this.userId) {
                const { userLib } = require('/lib/server/user')
                ninja = userLib.returnAdmin(this.userId)
            }
        }
        return ninja
    },

    userInfoBar: function() {
        let userBar : UserBar
        if (Meteor.isServer) {
            if (this.userId) {
                const { userLib } = require('/lib/server/user')
                userBar = userLib.findUserInfoBar(this.userId)
            }
        }
        return userBar
    },

    controlNewNinja: function(newNinja: RegisterUser) {
        check(newNinja.email, String)
        check(newNinja.password, String)
        check(newNinja.username, String)

        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            userLib.ctrl(newNinja)
        }
    },

    isRoot : function() {
        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            if (!userLib.isAdmin(this.userId))
                throw new Meteor.Error('404', 'No permission to do that !')
        }
    },

    isOwner : function(username: string) {
        check(username, String)
        let userext

        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            userext = userLib.isOwner(username, this.userId)
        }

        return userext
    },

    registerUserFrom: function(newNinja: RegisterUser) { 

        Meteor.call('controlNewNinja', newNinja)

        return newNinja
    }

})
