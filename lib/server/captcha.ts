import { Md5 } from 'ts-md5/dist/md5'
import { Captcha } from '/both/models/captcha.model'
import { Captchas } from '/both/collections/captchas.collection'
import { Server } from '/server/main.config.ts'
import { Meteor } from 'meteor/meteor'

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function selectCaptcha(randomRow: number):Captcha {
    let captcha : Captcha = Captchas.findOne({$and : [
        {'bloc.lang' : 'en'},
        {'index': randomRow }
    ]})
    return captcha
}

function selectCaptcha2(question: string):Captcha {
    let captcha : Captcha = Captchas.findOne({$and : [
        {'bloc.lang' : 'en'},
        {'bloc.question': question }
    ]})
    return captcha
}

function doHashThis(captcha: Captcha) {
    let hash
    if (captcha) {
        let salt = Server.salt
        let time : Date = new Date()
        time.setMinutes(time.getMinutes(), 0);
        let willbetransform = time + captcha._id + salt
        hash = Md5.hashStr(willbetransform)
    }
    return hash
}

Meteor.methods({

    hash: function(intRow: number) {
        let captcha : Captcha = selectCaptcha(intRow)
        let hashString = doHashThis(captcha)
        return hashString
    },
    question: function(IntRow: number) {
        let captcha = selectCaptcha(IntRow)

        if (captcha)
            return captcha.bloc[1].question
    },
    randomCaptcha: function(index: number) {
        console.log('randomCaptcha from secret')
        return randomIntFromInterval(1,index)
    },
    checkQuestionResponse: function(ques: string, resp: string) {
        let captcha : Captcha = selectCaptcha2(ques)

        if (!captcha)
            throw new Meteor.Error('404', 'Captcha not found')

        if (resp !== captcha.bloc[1].response)
            throw new Meteor.Error('404', 'Bad reponse found')

        return true
    },
    controlValidHash: function(capt):boolean {
        let captcha : Captcha = selectCaptcha2(capt.question)
        let salt : string = Server.salt
        let time : Date = new Date()
        for (let i = 0; i<5; i++) {
            time.setMinutes(time.getMinutes() + i, 0);
            let willbetransform = time + captcha._id + salt
            let newHash = Md5.hashStr(willbetransform)

            if (newHash == this.hash) {
                return true
            }
        }
        return false
    }
})
