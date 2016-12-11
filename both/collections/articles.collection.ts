import { MongoObservable } from 'meteor-rxjs'
import { Article } from '/both/models/article.model'
import { UsersExt } from '/both/collections/usersext.collection'

export const Articles = new MongoObservable.Collection<Article>('articles')

function isRoot(userid):boolean {
    let newroot = UsersExt.findOne({ 'admin': true })
    if (newroot) {
        return newroot.idOwner === userid
    }
    else
        return false
}

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
