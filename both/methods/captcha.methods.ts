import { Meteor } from 'meteor/meteor'

interface SecretCaptcha {
    hash: '',
    question : string
}

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
            let genId = Meteor.call('randomCaptcha', getCount)
            captcha.hash = Meteor.call('hash', genId)
            captcha.question = Meteor.call('question', genId)
        }

        return captcha
    },
    // TODO regenerate captcha if fail !
    checkValidHash: function(captcha: SecretCaptcha) {
        if (Meteor.isServer) {
            if(!Meteor.call('controlValidHash', captcha))
                throw new Meteor.Error('Captcha will be regenerate')
        }
    },
    controlResponse: function(ques: string, resp: string) {
        check(ques, String)
        check(resp, String)

        if (this.userId)
            throw new Meteor.Error('403', 'Alrealy Logged')

        if (Meteor.isServer) {
            if (!Meteor.call('checkQuestionResponse', ques, resp))
                throw new Meteor.Error('400', 'Bad response')
        }

        return true
    }
})
