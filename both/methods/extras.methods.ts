import { AboutDetail, AboutDetailForm } from '/both/models/extra.model'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({

    editOrAddAbout: function() {
        let about : AboutDetail
        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            if (!extraLib.hasFound(this.userId)) {
                console.log('Method will fail')
                throw new Meteor.Error('404', 'Not found')
            }
            about = extraLib.returnAbout(this.userId)
        }
        console.log('Method will return about')
        return about
    },
    sendAboutInfo: function() {

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
