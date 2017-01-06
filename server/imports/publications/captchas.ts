import { Meteor } from 'meteor/meteor'
import { Captchas } from '/both/collections/captchas.collection'
import { Counts } from 'meteor/tmeasday:publish-counts'
import { check } from 'meteor/check'

Meteor.publish('captcha', function(forLang: string) {
    check(forLang, String)

    if (this.userId)
        return

    Counts.publish(this, 'numberOfCaptcha', Captchas.collection
                   .find({ 'bloc.lang': forLang }), { noReady: true })

    return Captchas.find({ 'bloc.lang': forLang })
})
