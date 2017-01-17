import { CollectionObject } from './collection-object.model'

export interface Article extends CollectionObject {
    author: string,
    authorId: string,
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

export interface ArticleLimited {
    author: string,
    createdAt: Date,
    image: string,
    title: string,
    description: string
}
