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

class AnalyticLib {

    public register(connection) {
        insertIntoDatabase(connection)
    }

    public end(connection) {
        setQuitAt(connection)
    }
}

export const analyticLib = new AnalyticLib()
