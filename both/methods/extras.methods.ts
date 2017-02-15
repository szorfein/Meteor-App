import { AboutDetail, AboutDetailForm } from '/both/models/extra.model'
import { check } from 'meteor/check'

Meteor.methods({

    sendAboutForView: function() {
        let about : AboutDetail

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            about = extraLib.returnAboutForView()
        }
        return about
    },

    createAboutInfo: function(about : AboutDetailForm, imageId : string) {
        Meteor.call('isRoot')
        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            extraLib.addAbout(about, this.userId, imageId)
        }
    },

    domainName: function() {
        let domain : string

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            domain = extraLib.giveDomainName()
        }
        return domain
    }
})
