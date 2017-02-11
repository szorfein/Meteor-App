import { CollectionObject } from './collection-object.model'

export interface ImgurSetting {
    username : string,
    clientId : string,
    secretId : string
}

export interface ImgurSave extends CollectionObject {
    link: string
    linkFirstImage: string
    album : boolean
}
