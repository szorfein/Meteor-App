import { isMeteorId } from '/lib/validate'

Meteor.methods({

    registerAnalytic: function() {

        if (Meteor.isServer) {
            const { analyticLib } = require('/lib/server/analytic')
            const conn = buildConnection.call(this)
            analyticLib.register(conn)
        }
    },

    newViewToArticle: function(articleId : string) {
        
        if (isMeteorId(articleId)) {
            if (Meteor.isServer) {
                const { analyticLib } = require('/lib/server/analytic')
                const conn = buildConnection.call(this)
                analyticLib.isNewView(conn, articleId)
            }
        } else 
            throw new Meteor.Error('404', 'error to add view')
    }
})

function buildConnection() {
    return {
        'addressIp' : this.connection.clientAddress,
        'userAgent' : this.connection.httpHeaders['user-agent'],
        'accepLang' : this.connection.httpHeaders['accept-language']
    }
}
