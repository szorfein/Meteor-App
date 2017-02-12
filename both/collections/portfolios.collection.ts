import { ImgurLink } from '/both/models/portfolio.model'
import { MongoObservable } from 'meteor-rxjs'
import { isRoot } from '/lib/users'

export const ImgurLinks = new MongoObservable.Collection<ImgurLink>('imgur')

ImgurLinks.allow({
    insert : function(userId : string) {
        return isRoot(userId)
    },
    update : function(userId : string) {
        return isRoot(userId)
    },
    remove : function(userId : string) {
        return isRoot(userId)
    }
})
