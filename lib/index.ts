import { Indexes } from '/both/collections/indexes.collection'

enum indexName { captchaId, articleId }

function isGoodParam(idName: string) {
    return (idName == indexName[0] || idName == indexName[1])
}

// Meteor don't have findAndModify()
export function incIndex(idName: string):number {
    if (isGoodParam(idName)) {

        Indexes.update({ _id: idName }, {
            $inc: { seq: 1 }
        })

        let ret = Indexes.findOne({_id: idName})
        let found : number = 0

        if (ret)
            found = ret.seq

        return found
    }
    return 0
}

export function decIndex(idName: string) {
    if (isGoodParam(idName)) {
        Indexes.update({ _id: idName }, {
            $inc: { seq: -1 }
        })
    }
}


export function getIndex(idName: string):number {
    if (isGoodParam(idName)) {
        let ret = Indexes.findOne({_id: idName})
        let found : number = 0
        if (ret)
            found = ret.seq

        return found
    }
    return 0
}
