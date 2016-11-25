import { CollectionObject } from './collection-object.model'

export interface Article extends CollectionObject {
    owner: string,
    createdAt: Date,
    image: string,
    bloc: [ { 
        title: string, 
        lastEdit?: Date,
        lastEditOwner?: string,
        description: string, 
        lang: string, 
        article: string 
    } ],  
    isPublic: boolean,
    like?: number,
    hate?: number,
    tags?: [ string ]   
}
