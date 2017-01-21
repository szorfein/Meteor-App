import { Contact, ContactForm } from '/both/models/contact.model'
import { SecretCaptcha, CaptchaForm } from '/both/models/captcha.model'

Meteor.methods({
    addContact: function(form: ContactForm, captcha: SecretCaptcha, captchaForm: CaptchaForm) {

        Meteor.call('checkValidHash', captcha)
        Meteor.call('controlResponse', captchaForm)

        if (Meteor.isServer) {
            const { contactLib } = require('/lib/server/contact')
            contactLib.createNewContact(form)
        }
    }
})
