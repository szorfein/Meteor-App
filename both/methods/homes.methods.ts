import { HomeDetailForm } from '/both/models/extra.model'

Meteor.methods({
   
    editOrAddHome: function() {

        let homeForm : HomeDetail

        if (Meteor.isServer) {
            Meteor.call('isRoot')
            const { homeLib } = require('/lib/server/home')
            homeForm = homeLib.give()
        }

        return homeForm
    },

    homeDetail: function(form : HomeDetailForm, image: string) {

        Meteor.call('isRoot')
        if (Meteor.isServer) {
            const { homeLib } = require('/lib/server/home')
            homeLib.add(this.userId, form, image)
        }
    }
})
