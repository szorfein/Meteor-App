import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Articles } from '/both/collections/articles.collection'
import { tag } from '/lib/validate'

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

Meteor.publish('articlesTag', function(tagName : string) {
    if (tag(tagName)) {
        return Articles.find({'tags': tagName},{skip:0,limit:6,sort:{'createdAt':-1}})
    }

    throw new Meteor.Error('404', 'Tag not found')
})

Meteor.publish('articlesRelated', function(tags: Array<string>) {
    if (tags.length) {
        for (let i=0; i<tags.length; i++) {
            if (!/^[a-z]{3,10}$/i.test(tags[i]))
                throw new Meteor.Error('404', 'not valid tag')
        }
        return Articles.find({ 
            $or : [
                { 'tags': tags[0] },
                { 'tags': tags[1] },
                { $and: [ { isPublic: true } ] },
            ]
        }, { skip:0,limit:3,sort: {'createdAt':-1} })
    }
    throw new Meteor.Error('404', 'Bad tags parameter')
})

Meteor.publish('articlesDoc', function() {
    return Articles.find({ 'pastToFooter' : true }, { skip:0,limit:6,sort:{ 'createdAt':-1 }})
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
