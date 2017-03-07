import { Indexes } from '/both/collections/indexes.collection'
import { Index } from '/both/models/index.model'
import { isMeteorId } from '../validate'

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

    public add() {

    }

    public decIndex() {
        
    }

    public incIndex() {

    }

    public delete() {

    }

    private isExist(meteorId : string) : boolean {
        let indexes : Index

        if (isMeteorId(meteorId)) {
            indexes = Indexes.findOne(meteorId)
        }

        return !!indexes
    }
}

export const indexLib = new IndexLib()
