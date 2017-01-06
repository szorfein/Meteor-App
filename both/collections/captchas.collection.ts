import { MongoObservable } from 'meteor-rxjs'
import { Captcha, CaptchaIndex } from '/both/models/captcha.model'
import { isRoot } from '/lib/users'

export const Captchas = new MongoObservable.Collection<Captcha>('captchas')
export const CaptchasIndex = new MongoObservable.Collection<CaptchaIndex>('captchaIndex')

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

CaptchasIndex.allow({
    insert: function(userId: string) {
        return isRoot(userId)
    },
    update: function(userId: string) {
        return isRoot(userId)
    }
})
