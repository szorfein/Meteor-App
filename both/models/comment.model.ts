import { CollectionObject } from './collection-object.model'

export interface C0mm3nt extends CollectionObject {
    articleId: string,
    poster: string, 
    posted: Date, 
    lastEdit?: Date,
    img: string, 
    parentId?: string,
    like: [ { nb: number, username: string, when: Date } ]
    hate: [ { nb: number, username: string, when: Date } ]
}
