import { CollectionObject } from './collection-object.model'

export interface Contact extends CollectionObject {
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string,
    createdAd: Date
}

export interface ContactForm {
    name: string
    email: string
    phone: string
    subject: string
    message: string
    captcha: string
}
