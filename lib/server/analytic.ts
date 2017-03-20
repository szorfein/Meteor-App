import { Analytic, Connection } from '/both/models/analytics.model'
import { Analytics } from '/both/collections/analytics.collections'
import { articleLib } from './article'
import { isMeteorId, agent } from '/lib/validate'
import { Meteor } from 'meteor/meteor'

function insertIntoDatabase(connection : Connection) {
    if (!checkDatabase(connection)) {
        createNew(connection)
    }
}

function checkDatabase(connection : Connection) {
    const data = Analytics.findOne({ addressIp: connection.addressIp })
    return !!data
}

function checkIfAlrealyView(connection : Connection, articleId : string) {
    const data = Analytics.findOne({ 
        $and: [
            { addressIp: connection.addressIp },
            { hasVisitArticle: articleId }
        ]
    })
    return !!data
}

function createNew(connection : Connection) {
    Analytics.insert({
        addressIp: connection.addressIp,
        userAgent: connection.userAgent,
        preferLang: connection.accepLang,
        quitAt: new Date(),
        userId: '',
        hasVisitArticle: [],
        hasPostComment: []
    })
}

function setQuitAt(connection : Connection) {
    Analytics.update({ addressIp: connection.addressIp }, {
        $set: {
            quitAt: new Date()
        }
    })
}

// for look httpHeaders -> JSON.stringify(connection.httpHeaders))
class AnalyticLib {

    public register(connection : Connection) {
        insertIntoDatabase(connection)
    }

    public end(connection : Connection) {
        setQuitAt(connection)
    }

    public isNewView(connection : Connection, articleId : string) {
        insertIntoDatabase(connection)
        if (isMeteorId(articleId)) {
            if (checkIfAlrealyView(connection, articleId)) {
                return
            } else {
                this.pushToView(connection, articleId)
                articleLib.incViewArticle(articleId)
            }
        } else
            throw new Meteor.Error('404','arg no valid')
    }

    private pushToView(connection : Connection, articleId : string) {
        if (articleLib.isExist(articleId)) {
            this.newView(connection, articleId)
        } else
            throw new Meteor.Error('404', 'article is unknow...')
    }

    private newView(connection : Connection, articleId : string) {
        let newData : Array<string> = []
        newData = this.retrieveOldVisitArticle(connection)
        newData.push(articleId)
        Analytics.update({ addressIp: connection.addressIp }, {
            $set: {
                hasVisitArticle: newData
            }
        })
    }

    private retrieveOldVisitArticle(connection : Connection) {
        const data = Analytics.findOne({ addressIp : connection.addressIp })
        return data ? data.hasVisitArticle : []
    }
}

export const analyticLib = new AnalyticLib()
