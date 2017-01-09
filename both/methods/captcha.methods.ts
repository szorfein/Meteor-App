import { Meteor } from 'meteor/meteor'
import { SecretCaptcha } from '/both/models/captcha.model'

Meteor.methods({

    /*
     * We return only hash and question to view.
     */
    secretCaptcha: function(getCount: number) {
        check(getCount, Number)
        let captcha : SecretCaptcha = { hash: '', question: '' }

        if (this.userId)
            throw new Meteor.Error('403', 'Alrealy Logged')

        if (Meteor.isServer) {
            const { captchaLib } = require('/lib/server/captcha')
            let genId = captchaLib.randomCaptcha(getCount)
            captcha.hash = captchaLib.hash(genId)
            captcha.question = captchaLib.question(genId)
        }

        return captcha
    },
    checkValidHash: function(captcha: SecretCaptcha) {
        if (Meteor.isServer) {
            const { captchaLib } = require('/lib/server/captcha')
            if (!captchaLib.controlValidHash(captcha)) {
                throw new Meteor.Error('201', 'new captcha regenerate')
            }
        }
    },
    controlResponse: function(ques: string, resp: string) {
        check(ques, String)
        check(resp, String)

        if (this.userId)
            throw new Meteor.Error('403', 'Alrealy Logged')

        if (Meteor.isServer) {
            const { captchaLib } = require('/lib/server/captcha')

            if (!captchaLib.checkQuestionResponse(ques, resp))
                throw new Meteor.Error('400', 'Bad response')
        }
    }
})
