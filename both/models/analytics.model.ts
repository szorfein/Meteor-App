import { CollectionObject } from './collection-object.model'

export interface Analytic extends CollectionObject {
    uniqueId: string;
    addressIp: string;
    httpHeader: Object;
    visitAt: Date;
    quitAt: Date;
}
