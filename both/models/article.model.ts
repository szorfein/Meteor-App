import { CollectionObject } from './collection-object.model'

export interface Article extends CollectionObject {
    title: string,
    image: string,
    body: string,
    writer: string,
    owner?: string,
    public: boolean,
    datenow?: {type: Date};
}
