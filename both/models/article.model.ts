import { CollectionObject } from './collection-object.model'

export interface Article extends CollectionObject {
    authorId: string
    createdAt: Date
    lastEdit?: Date
    lastEditOwner?: string
    image: string
    lang?: [ { 
        title?: string 
        description?: string 
        article?: string
    } ],  
    isPublic: boolean
    tags?: Array<string>
    index: number
    pastToFooter?: boolean
    commentNb?: number
    view?: number
}

export interface ArticleForm {
    title: string
    description: string
    lang?: string
    image: string
    article: string
    isPublic: boolean
    toFooter: boolean
}
