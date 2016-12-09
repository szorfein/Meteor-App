import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { Article } from '/both/models/article.model'
import { isLogged } from '/lib/users'
import { UsersExt } from '/both/collections/usersext.collection'

export const Articles = new MongoObservable.Collection<Article>('articles')

const newroot = UsersExt.findOne({ 'admin': true })

function isRoot() {
    console.log('newroot exist in root ? 4 ' + newroot)
    console.log('newroot exist in root ? 3 ' + !!newroot)
    if (newroot) return newroot.idOwner === Meteor.userId()
        else
            return false
}

Articles.allow({
    insert: isRoot,
    update: isRoot,
    remove: isRoot   
})
