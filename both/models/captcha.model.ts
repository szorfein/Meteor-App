import { CollectionObject } from './collection-object.model'

export interface Captcha extends CollectionObject {
    bloc: [
        { 
            lang: string,
            question: string,
            response: string
        }
    ],
    index: number
}

export interface SecretCaptcha {
    hash : string;
    question : string;
}

export interface CaptchaForm {
    question: string;
    response: string;
}
