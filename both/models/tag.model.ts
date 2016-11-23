import { CollectionObject } from './collection-object.model'

export interface Tag extends CollectionObject {
    name: string,
    articleNb: number,
    articleDesc: [ { id?: string, title?: string } ]
}
