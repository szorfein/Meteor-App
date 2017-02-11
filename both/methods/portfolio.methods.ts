import { ImgurSetting } from '/both/models/portfolio.model'
import { check } from 'meteor/check'

Meteor.methods({

    imgurConfig : function() {

        let setting : ImgurSetting

        if (Meteor.isServer) {
            const { portfolioLib } = require('/lib/server/portfolio')
            setting = portfolioLib.setting()
        }

        return setting
    },

    addPortfolioLink : (linkForm : string) => {
        check(linkForm, String)

        Meteor.call('isRoot')

        if (Meteor.isServer) {
            const { portfolioLib } = require('/lib/server/portfolio')
            portfolioLib.add(linkForm)
        }
    }
})
