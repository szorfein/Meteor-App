import { Captchas } from '/both/collections/captchas.collection'
import { Captcha } from '/both/models/captcha.model'

export function loadCaptcha() {

    if(Captchas.find().cursor.count() === 0) {
        const captchas: Captcha[] = [
            {
                question: 'Combien font seize moin deux?',
                lang: 'fr',
                response: '14'
            },
            {
                question: 'How make sixteen minus two?',
                lang: 'en',
                response: '14'
            },
            {
                question: 'Quel est la capitale de France?',
                lang: 'fr',
                response: 'Paris'
            },
            {
                question: "What's capital city from French?",
                lang: 'en',
                response: 'Paris'
            },
            {
                question: 'Dans quel pays reside Snowden actuellement?',
                lang: 'fr',
                response: 'Russie'
            },
            {
                // Too hard question for a lot of person? :)
                question: 'Where is Snowden actually?',
                lang: 'en',
                response: 'Russian'
            }
        ]
        captchas.forEach((captcha: Captcha) => Captchas.insert(captcha))
    }
}
