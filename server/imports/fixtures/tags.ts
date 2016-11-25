import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'

export function loadTags() {

    if (Tags.find().cursor.count() === 0) {
        const tags: Tag[] = [
            { name: 'Linux' },
            { name: 'OSX' },
            { name: 'Windows' },
            { name: 'Terra' },
            { name: 'Warn' }
        ]
        tags.forEach((tag: Tag) => Tags.insert(tag))
    }

}
