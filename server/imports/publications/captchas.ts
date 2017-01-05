import { Meteor } from 'meteor/meteor'
import { Captchas } from '/both/collections/captchas.collection'

Meteor.publish('captcha', function(forLang: string) {
    if (this.userId)
        return

    return Captchas.find({ lang: forLang }, {limit: 1})
})
