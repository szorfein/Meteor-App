import { Meteor } from 'meteor/meteor'
import { Analytics } from '/both/collections/analytics.collections'

Meteor.methods({

    registerAnalytic: function() {

        if (Meteor.isServer) {
            const analyticLib = require('/lib/server/analytic')
            Meteor.onConnection((connection) => {
                connection.onClose(() => {
                    console.log('Client has quit')
                    analyticLib.end(connection)
                })
                analyticLib.register(connection)
            })
        }
    }
})
