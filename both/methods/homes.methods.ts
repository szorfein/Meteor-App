import { HomeDetailForm } from '/both/models/extra.model'

Meteor.methods({
   
    editOrAddHome: function() {
        Meteor.call('isRoot')
        let formHome
        if (Meteor.isServer) {
            const { homeLib } = require('/lib/server/home')
            formHome = homeLib.isExist()
        }
        return formHome
    },

    homeDetail: function(form : HomeDetailForm, image: string) {

        Meteor.call('isRoot')
        if (Meteor.isServer) {
            const { homeLib } = require('/lib/server/home')
            homeLib.add(this.userId, form, image)
        }
    }
})
