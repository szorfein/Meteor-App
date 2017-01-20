import { MongoObservable } from 'meteor-rxjs'
import { Article } from '/both/models/article.model'
import { isRoot } from '/lib/users'

export const Articles = new MongoObservable.Collection<Article>('articles')

Articles.allow({
    insert: function(userId: string) {
        return isRoot(userId)
    },
    update: function(userId: string) {
        return isRoot(userId)
    },
    remove: function(userId: string) {
        return isRoot(userId)
    }
})
