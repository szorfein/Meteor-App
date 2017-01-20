import { Index } from '/both/models/index.model'
import { Indexes } from '/both/collections/indexes.collection'

function initializeIndex(idName: string) {
    const initIndex : Index[] = [
        {
            _id: idName,
            seq: 0
        }
    ]
    initIndex.forEach((initIndex: Index) => Indexes.insert(initIndex))
}

export function loadIndexes() {
    if (Indexes.find().cursor.count() === 0) {
        initializeIndex('captchaId')
        initializeIndex('articleId')
    }
}
