import { CollectionObject } from './collection-object.model'

export interface ImgurSetting {
    username : string,
    clientId : string,
    secretId : string
}

export interface ImgurLink extends CollectionObject {
    submitAt : Date
    owner : string
    link: string
    idImgur : string
}
