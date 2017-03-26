import { CollectionObject } from './collection-object.model'

// retrieve lang : AboutDetail.lang[retLang('en')].aboutYou
export interface AboutDetail {
    imageOfYou?: string,
    idOwner: string,
    name: string,
    company?: string,
    lang?: [
        {
            aboutCompany? : string,
            job? : string,
            aboutYou? : string,
            skills? : string
        }
    ],
    email?: string,
    mobile?: string,
    fix?: string,
    fax?: string,
    address?: { 
        street? : string,
        cp? : string,
        city? : string
    },
    facebook?: string,
    github?: string,
    twitter?: string,
    dotshare?: string,
    imgur?: string,
    reddit?: string
}

export interface AboutDetailForm {
    image?: string,
    name: string,
    lang: string,
    company?: string,
    aboutCompany?: string,
    jobName?: string,
    skill?: string,
    mail?: string,
    mobile?: string,
    fix?: string,
    fax?: string,
    aboutYou?: string,
    street? : string,
    cp? : string,
    city? : string
    facebook?: string,
    github?: string,
    twitter?: string,
    dotshare?: string,
    imgur?: string,
    reddit?: string
}

// retrieve lang : HomeDetail.lang[retLang('en')].title
export interface HomeDetail extends CollectionObject {
    banner?: string
    lang?: [
        {
            title? : string,
            message? : string
        }
    ],
    idOwner: string
}

export interface HomeDetailForm {
    imageBanner? : string
    lang? : string
    title? : string
    message? : string
}
