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

export interface CaptchaIndex {
    _id : string,
    seq: number
}
