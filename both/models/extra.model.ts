import { CollectionObject } from './collection-object.model'

export interface Extra extends CollectionObject {
    lastEdit: Date,
    post: string,
    lang: string,
    title: string
}
