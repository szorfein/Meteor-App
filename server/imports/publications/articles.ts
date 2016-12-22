import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Articles } from '/both/collections/articles.collection'
import { Counts } from 'meteor/tmeasday:publish-counts'

interface Options {
    [key: string]: any
}

Meteor.publish('articles', function(options: Options) {
    const selector = buildQuery.call(this, null)

    Counts.publish(this, 'numberOfArticles', Articles.collection.find(
        buildQuery.call(this)
    ), { noReady: true })

    return Articles.find(selector, options)
})

Meteor.publish('article', function(articleId: string) {
    return Articles.find(buildQuery.call(this, articleId))
})

function buildQuery(articleId?: string) : Object {

    if(articleId) 
        check(articleId, String)

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
