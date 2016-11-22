import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { Article } from '/both/models/article.model'
import { isLogged } from '/lib/users'

export const Articles = new MongoObservable.Collection<Article>('articles')

Articles.allow({
    insert: isLogged,
    update: isLogged,
    remove: isLogged 
})
