import { Captchas, CaptchasIndex } from '/both/collections/captchas.collection'
import { Captcha, CaptchaIndex } from '/both/models/captcha.model'
import { incrementIndex } from '/both/lib/captcha'

export function loadCaptchaIndex() {
    if(CaptchasIndex.find().cursor.count() === 0) {
        const captchasIndex: CaptchaIndex[] = [
            {
                _id: 'captchaId',
                seq: 0
            }
        ]
        captchasIndex.forEach((captchaIndex: CaptchaIndex) => CaptchasIndex
                              .insert(captchaIndex))
    }
}

export function loadCaptcha() {

    if(Captchas.find().cursor.count() === 0) {
        const captchas: Captcha[] = [
            {
                bloc: [
                    {
                        lang: 'fr',
                        question: 'Combien font seize moin deux?',
                        response: '14'
                    },
                    {
                        lang: 'en',
                        question: 'How make sixteen minus two?',
                        response: '14'
                    }
                ],
                index: incrementIndex()
            },
            {
                bloc: [
                    {
                        lang: 'fr',
                        question: 'Quel est la capitale de France?',
                        response: 'Paris'
                    },
                    {
                        lang: 'en',
                        question: "What's capital city from French?",
                        response: 'Paris'
                    }
                ],
                index: incrementIndex()
            },
            {
                bloc: [
                    {
                        lang: 'fr',
                        question: 'Dans quel pays reside Snowden actuellement?',
                        response: 'Russie'
                    },
                    {
                        // Too hard question for a lot of person? :)
                        lang: 'en',
                        question: 'Where is Snowden actually?',
                        response: 'Russian'
                    }
                ],
                index: incrementIndex()
            }
        ]
        captchas.forEach((captcha: Captcha) => Captchas.insert(captcha))
    }
}
