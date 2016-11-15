import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { Article } from '/both/models/article.model'

export const Articles = new MongoObservable.Collection<Article>('articles')

function loggedIn() {
    return !!Meteor.user()
}

Articles.allow({
    insert: loggedIn,
    update: loggedIn,
    remove: loggedIn
})
