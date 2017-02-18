import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Articles } from '/both/collections/articles.collection'

interface Options {
    [key: string]: any
}

Meteor.publish('articles', function(options: Options) {
    const selector = buildQuery.call(this, null)
    return Articles.find(selector, options)
})

Meteor.publish('article', function(articleId: string) {
    return Articles.find(buildQuery.call(this, articleId))
})

Meteor.publish('articlesNb', function(nb : number) {
    const selector = buildQuery.call(this, null)
    return Articles.find(selector, {skip:0,limit:nb,sort: {'bloc.lastEdit': -1}})
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
