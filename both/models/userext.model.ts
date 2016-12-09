import { CollectionObject } from './collection-object.model'

export interface UserExt extends CollectionObject {
    name: string,
    idOwner: string,
    admin: boolean,
    ban: boolean,
    created?: Date,
    lastVisit?: Date,
    objUser: { realName?: string, provider?: string, website?: string, img?: string },
    like?: [ string ],
    hate?: [ string ],
    comment?: [ string ],
    isPublic: boolean
}
