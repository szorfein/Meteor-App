import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Articles } from '/both/collections/articles.collection'

Meteor.publish('articles', function() {
    return Articles.find(buildQuery.call(this))
})

Meteor.publish('article', function(articleId: string) {
    return Articles.find(buildQuery.call(this, articleId))
})

function buildQuery(articleId?: string): Object {
    if(articleId) check(articleId, String)

    const isAvailable = {
        $or: [
            { isPublic: true },
            { $and: [
                { authorId: this.userId },
                { authorId: { $exists: true } }
            ] }
        ]
    }
    
    if (articleId) {
        return {
            $and: [
                { _id: articleId },
                isAvailable
            ]
        }
    }
    return isAvailable
}
