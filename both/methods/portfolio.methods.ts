import { ImgurSetting } from '/both/models/portfolio.model'

Meteor.methods({

    imgurConfig : function() {

        let setting : ImgurSetting

        if (Meteor.isServer) {
            const { portfolioLib } = require('/lib/server/portfolio')
            setting = portfolioLib.setting()
            console.log('setting = ' + setting.username)
        }

        return setting
    }
})
