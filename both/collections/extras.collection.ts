import { MongoObservable } from 'meteor-rxjs'
import { AboutDetail, HomeDetail } from '/both/models/extra.model'
import { isRoot } from '/lib/users'

export const AboutsDetail = new MongoObservable.Collection<AboutDetail>('abouts')
export const HomesDetail = new MongoObservable.Collection<HomeDetail>('home')

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
