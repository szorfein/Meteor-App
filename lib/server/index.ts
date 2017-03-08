import { Indexes } from '/both/collections/indexes.collection'
import { Index } from '/both/models/index.model'
import { isMeteorId, tag } from '../validate'

enum indexName {
    captchaId, articleId
}

class IndexLib {

    public create(meteorId : string) {
        if (!this.isExist(meteorId)) {
            Indexes.insert({ 
                _id : meteorId,
                seq : 0
            })
            console.log('from secret Index, insert new -> ' + meteorId)
        }
    }

    public decIndex(meteorId : string) {
        if (this.isExist(meteorId)) {
            Indexes.update({ _id: meteorId }, {
                $inc: { seq: -1 }
            })
            console.log('Index have successfully decrease')
        } else {
            console.log('decIndex has fail')
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
        let indexes : Index

        if (isMeteorId(meteorId)) {
            indexes = Indexes.findOne(meteorId)
            console.log('isExist work has passed isMeteorId -> ' + meteorId)
        } else if (tag(meteorId)) {
            console.log('isExist has passed tag validate -> ' + meteorId)
            return meteorId == indexName[0] || meteorId == indexName[1]
        }

        console.log('isExist will return '+ !!indexes)
        return !!indexes
    }
}

export const indexLib = new IndexLib()
