import { CollectionObject } from './collection-object.model'

export interface Analytic extends CollectionObject {
    uniqueId: string;
    addressIp: string;
    httpHeader: Object;
    visitAt: Date;
    quitAt: Date;
    articleRead?: string[];
}

export interface BrowserWeb extends CollectionObject {
    name: string,
    addresseIp: Array<string>,
}
