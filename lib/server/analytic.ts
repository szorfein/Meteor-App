import { Analytic } from '/both/models/analytics.model'
import { Analytics } from '/both/collections/analytics.collections'
import { Meteor } from 'meteor/meteor'

function insertIntoDatabase(connection) {
    if (!checkDatabase(connection))
        createNew(connection)
    else
        return
}

function checkDatabase(connection) {
    let data : Analytic = Analytics.find({ $or: [
        { uniqueId: connection.id },
        { addressIp: connection.clientAddress }
    ]})
    return !!data
}

function createNew(connection) {
    Analytics.insert({
        uniqueId: connection.id,
        addressIp: connection.clientAddress,
        httpHeader: connection.httpHeaders,
        visitAt: new Date(),
        quitAt: new Date()
    })
}

function setQuitAt(connection) {
    Analytics.update({ 'uniqueId': connection.id }, {
        $set: {
            quitAt: new Date()
        }})
}

// for look httpHeaders -> JSON.stringify(connection.httpHeaders))
class AnalyticLib {

    public register(connection) {
        console.log('address ip -> '+ connection.clientAddress)
        console.log('user-agent -> ' + connection.httpHeaders["user-agent"])
        console.log('accept-lang -> ' + connection.httpHeaders["accept-language"])
        
        insertIntoDatabase(connection)
    }

    public end(connection) {
        setQuitAt(connection)
    }

    public isNewView(connection, articleId : string) {
        this.register(connection)

    }
}

export const analyticLib = new AnalyticLib()
