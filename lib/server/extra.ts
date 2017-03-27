import { AboutDetail, AboutDetailForm } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'
import { Lang } from '/both/enums/lang.enum'
import { isMeteorId } from '/lib/validate'
import { retLang } from '/lib/lang'

function noneByDefault(text: string) {
    return text ? text : ''
}

function buildAbout(about: AboutDetailForm, userId: string, imageId: string) {
    const oldAbout = giveThisForm(userId)
    const oldLang = oldAbout ? oldAbout.lang : null
    let newAbout : AboutDetail

    newAbout = {
        imageOfYou: noneByDefault(imageId),
        idOwner: userId,
        name: about.name,
        company: noneByDefault(about.company),
        email: noneByDefault(about.mail),
        mobile: noneByDefault(about.mobile),
        fix: noneByDefault(about.fix),
        fax: noneByDefault(about.fax),
        lang : oldLang,
        address: {
            street: noneByDefault(about.street),
            cp : noneByDefault(about.cp),
            city : noneByDefault(about.city)
        },
        facebook: noneByDefault(about.facebook),
        github: noneByDefault(about.github),
        twitter: noneByDefault(about.twitter),
        dotshare: noneByDefault(about.dotshare),
        imgur: noneByDefault(about.imgur),
        reddit: noneByDefault(about.reddit)
    }
    newAbout.lang[retLang(about.lang)] = { 
        aboutCompany : noneByDefault(about.aboutCompany),
        job: noneByDefault(about.jobName),
        aboutYou: noneByDefault(about.aboutYou),
        skills: noneByDefault(about.skill)
    }

    return newAbout
}

function giveThisForm(userId? : string) {
    let about : AboutDetail
    let isUserID = userId ? { 'idOwner' : userId } : {}
    about = AboutsDetail.findOne(isUserID)
    return about
}

class ExtraLib {

    public addAbout(about : AboutDetailForm, userId : string, imageId : string) {
        const newAbout : AboutDetail = buildAbout(about, userId, imageId)
        if (this.hasFound(userId)) {
            AboutsDetail.update({'idOwner': userId}, newAbout)
        } else {
            AboutsDetail.insert(newAbout)
        }
    }

    public hasFound(userId : string) : boolean {
        const about = giveThisForm(userId)
        return !!about
    }

    public giveDomainName() : string {
        const about = giveThisForm()
        if (!about)
            throw new Meteor.Error('404', 'No found')

        if (!about.company)
            throw new Meteor.Error('404', 'Domain not registered')

        return about.company
    }
}

export const extraLib = new ExtraLib()
