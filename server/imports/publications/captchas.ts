import { Meteor } from 'meteor/meteor'
import { Captchas } from '/both/collections/captchas.collection'
import { check } from 'meteor/check'

Meteor.publish('captcha', function(forLang: string) {
    check(forLang, String)

    if (this.userId)
        return

    return Captchas.find({ 'bloc.lang': forLang },{skip:0,limit:0})
})
