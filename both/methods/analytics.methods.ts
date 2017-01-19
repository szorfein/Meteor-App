import { Meteor } from 'meteor/meteor'
import { Analytics } from '/both/collections/analytics.collections'

Meteor.methods({
    getIp: function() {

        if (Meteor.isServer) {
            console.log('server side')
            Meteor.onConnection((connection) => {
                connection.onClose(() => {
                    console.log('Client has quit')
                })
                Analytics.insert({
                    uniqueId: connection.id,
                    addressIp: connection.clientAddress,
                    httpHeader: connection.httpHeaders,
                    visitAt: new Date(),
                    quitAt: new Date()
                })
            })
        }
    }
})
