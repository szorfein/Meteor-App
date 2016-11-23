import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'

export function loadTags() {

    if (Tags.find().cursor.count() === 0) {
        const tags: Tag[] = [
            { name: 'Linux', articleNb: 10, articleDesc: [ { id: '5', title: 'Lin_t' } ] },
            { name: 'OSX', articleNb: 15, articleDesc: [ { id: '15', title: 'OX_itl' } ] },
            { name: 'Windows', articleNb: 1, articleDesc: [ { id: '1', title: 'Wiow' } ] },
            { name: 'Terra', articleNb: 50, articleDesc: [ { id: '50', title: 'Ter_' } ] },
            { name: 'Warn', articleNb: 120, articleDesc: [ { id: '120', title: 'W_t' } ] }
        ]
        tags.forEach((tag: Tag) => Tags.insert(tag))
    }

}
