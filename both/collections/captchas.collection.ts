import { MongoObservable } from 'meteor-rxjs'
import { Captcha } from '/both/models/captcha.model'
import { isRoot } from '/lib/users'

export const Captchas = new MongoObservable.Collection<Captcha>('captchas')

Captchas.allow({
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
