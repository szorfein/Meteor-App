import { CollectionObject } from './collection-object.model'

export interface Analytic extends CollectionObject {
    addressIp: string
    userAgent: string
    preferLang: string
    quitAt: Date
    userId?: string
    hasVisitArticle?: Array<string>
    hasPostComment?: Array<string>
    connected: boolean
}

export interface Connection {
    addressIp : string
    userAgent : string
    accepLang : string
}
