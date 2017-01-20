import { Indexes } from '/both/collections/indexes.collection'

// Meteor don't have findAndModify()
export function incIndex(idName: string):number {
    Indexes.update({ _id: idName }, {
        $inc: { seq: 1 }
    })

    let ret = Indexes.findOne({_id: idName})
    let found : number = 0

    if (ret)
        found = ret.seq

    return found
}
