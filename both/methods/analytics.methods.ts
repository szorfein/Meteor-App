import { Meteor } from 'meteor/meteor'
import { isMeteorId } from '/lib/validate'
import { Analytics } from '/both/collections/analytics.collections'

Meteor.methods({

    registerAnalytic: function() {

        if (Meteor.isServer) {
            const { analyticLib } = require('/lib/server/analytic')
            Meteor.onConnection((connection) => {
                connection.onClose(() => {
                    console.log('Client has quit')
                    analyticLib.end(connection)
                })
                analyticLib.register(connection)
            })
        }
    },

    newViewToArticle: function(articleId : string) {
        if (isMeteorId(articleId)) {
            if (Meteor.isServer) {
                const { analyticLib } = require('/lib/server/analytic')
                Meteor.onConnection((connection) => {
                    analyticLib.isNewView(connection, articleId)
                    console.log('we will program that')
                })
            }
        } else 
            throw new Meteor.Error('404', 'error to add view')
    }
})
