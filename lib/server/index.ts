import { Indexes } from '/both/collections/indexes.collection'
import { Index } from '/both/models/index.model'
import { isMeteorId, tag } from '../validate'

enum indexName {
    captchaId, articleId
}
enum indexNew {
    view , comm
}

class IndexLib {

    public create(meteorId : string) {
        if (!this.isExist(meteorId)) {
            Indexes.insert({ 
                _id : meteorId,
                seq : 0
            })
        }
    }

    public decIndex(meteorId : string) {
        if (this.isExist(meteorId)) {
            Indexes.update({ _id: meteorId }, {
                $inc: { seq: -1 }
            })
        }
    }

    public incIndex(meteorId : string) {
        if (this.isExist(meteorId)) {
            Indexes.update({ _id: meteorId}, {
                $inc: { seq: 1 }
            })
        }
    }

    public returnIndex(meteorId : string) {
        let res : number = 0
        if (this.isExist(meteorId)) {
            let index : Index = Indexes.findOne({ _id: meteorId })
            if (index)
                res = index.seq
        }
        return res
    }

    private isExist(meteorId : string) : boolean {
        this.ctrlArg(meteorId)
        const indexes = Indexes.findOne(meteorId)
        return !!indexes
    }

    private ctrlArg(meteorId : string) {

        if (tag(meteorId)) {
            return meteorId == indexName[0] || meteorId == indexName[1]
        } else if (meteorId.length >= 20) {
            let split = meteorId.split(/_/)
            return split[0] == indexNew[0] && isMeteorId(split[1])
        } else {
            throw new Meteor.Error('404', 'Bad arg')
        }
    }
}

export const indexLib = new IndexLib()
