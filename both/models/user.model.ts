import { Meteor } from 'meteor/meteor'
import { CollectionObject } from './collection-object.model'

export interface User extends Meteor.User {}

export interface RegisterUser {
    email : string
    confirmEmail : string
    password : string
    confirmPassword : string
    username : string
}

export interface UserBar {
    username: string
    message : number
}

export interface UserExt extends CollectionObject {
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
