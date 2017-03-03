import { CollectionObject } from './collection-object.model'

export interface C0mment extends CollectionObject {
    posterId: string, 
    posted: Date, 
    lastposted?: Date,
    father: string,
    son?: string,
    post: string
}

export interface CommentFormWithoutLoggin {
    post: string
    username: string
    email: string
    website?: string
    captcha: string
}
