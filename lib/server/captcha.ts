import { Md5 } from 'ts-md5/dist/md5'
import { Captcha, SecretCaptcha, CaptchaForm } from '/both/models/captcha.model'
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

class CaptchaLib {

    public hash(intRow: number) {
        let captcha : Captcha = selectCaptcha(intRow)
        let hashString = doHashThis(captcha)
        return hashString
    }

    public question(IntRow: number) {
        let captcha = selectCaptcha(IntRow)

        if (captcha)
            return captcha.bloc[1].question
    }

    public randomCaptcha(index: number) {
        return randomIntFromInterval(1,index)
    }

    public ctrlCaptchaForm(captchaForm: CaptchaForm) {
        let captcha : Captcha = selectCaptcha2(captchaForm.question)

        if (!captcha)
            return false

        if (captchaForm.response !== captcha.bloc[1].response)
            return false

        return true
    }

    public controlValidHash(capt: SecretCaptcha):boolean {
        let captcha : Captcha = selectCaptcha2(capt.question)
        let salt : string = Server.salt
        let timenow : Date = new Date()
        timenow.setMinutes(timenow.getMinutes() - 5, 0)
        const time : Date = timenow

        for (let i = 0; i < 10; i++) {
            time.setMinutes(time.getMinutes() + 1, 0);
            let willbetransform = time + captcha._id + salt
            let newHash = Md5.hashStr(willbetransform)

            if (newHash == capt.hash) {
                return true
            }
        }
        return false
    }
}

export const captchaLib = new CaptchaLib()
