import { MongoObservable } from 'meteor-rxjs'
import { Extra, AboutDetail, HomeDetail } from '/both/models/extra.model'
import { isRoot } from '/lib/users'

export const Extras = new MongoObservable.Collection<Extra>('extras')
export const AboutsDetail = new MongoObservable.Collection<AboutDetail>('abouts')
export const HomesDetail = new MongoObservable.Collection<HomeDetail>('home')

Extras.allow({
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

AboutsDetail.allow({
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

HomesDetail.allow({
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
