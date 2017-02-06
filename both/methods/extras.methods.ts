import { AboutDetail, AboutDetailForm, SocialTag } from '/both/models/extra.model'
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
        return about
    },

    sendAboutForView: function() {
        let about : AboutDetail

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            about = extraLib.returnAboutForView()
        }
        return about
    },

    createAboutInfo: function(about : AboutDetailForm, imageId : string) {
        check(imageId, String)

        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            extraLib.addAbout(about, this.userId, imageId)
        }
    },

    socialList: function() {
        let socialLst: SocialTag
        
        if (Meteor.isServer) {
            const { extraLib } = require('/lib/server/extra')
            socialLst = extraLib.giveSocialList()
        }
        return socialLst
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
