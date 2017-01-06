import { Pipe, PipeTransform } from '@angular/core'
import { Captcha } from '/both/models/captcha.model'

@Pipe({
    name: 'displayCaptcha'
})

export class DisplayCaptchaPipe implements PipeTransform {
    transform(captcha: Captcha):string {

        if (!captcha)
            return ''

        if (captcha)
            return captcha.bloc[0].question

        return ''
    }
}

