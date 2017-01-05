import { CollectionObject } from './collection-object.model'

export interface Captcha extends CollectionObject {
    question: string,
    response: string,
    lang: string
}
