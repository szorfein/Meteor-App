import { AboutDetailForm } from '/both/models/extra.model'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({

    sendAboutInfo: function() {

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
        }
    },
    editAboutInfo: function() {

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
        }
    },
    createAboutInfo: function(about: AboutDetailForm) {

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            extraLib.addAbout(about, this.userId)
        }
    }
})
