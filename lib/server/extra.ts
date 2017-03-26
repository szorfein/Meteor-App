import { AboutDetail, AboutDetailForm } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'
import { Lang } from '/both/enums/lang.enum'
import { retLang } from '/lib/lang'

function noneByDefault(text: string) {
    if (text)
        return text
    else
        return ''
}

function buildAbout(about: AboutDetailForm, userId: string, imageId: string) {
    const newAbout : AboutDetail = {
        imageOfYou: noneByDefault(imageId),
        idOwner: userId,
        name: about.name,
        company: noneByDefault(about.company),
        email: noneByDefault(about.mail),
        mobile: noneByDefault(about.mobile),
        fix: noneByDefault(about.fix),
        fax: noneByDefault(about.fax),
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

function giveThisForm(userId: string) {
    const about = AboutsDetail.findOne({ 'idOwner': userId })
    return about
}

class ExtraLib {

    public addAbout(about : AboutDetailForm, userId : string, imageId : string) {
        const newAbout : AboutDetail = buildAbout(about, userId, imageId)
        if (this.hasFound(userId)) {
            console.log('Formulaire will be update...')
            AboutsDetail.update({'idOwner': userId}, newAbout)
        } else {
            console.log('We create a new about form')
            AboutsDetail.insert(newAbout)
        }
    }

    public returnAbout(userId : string) {
        const about = giveThisForm(userId)
        return about
    }

    public hasFound(userId : string) : boolean {
        const about = giveThisForm(userId)
        return !!about
    }

    public returnAboutForView() : AboutDetail {
        const about : AboutDetail = AboutsDetail.findOne()
        return about
    }

    public giveDomainName() : string {
        const about = this.returnAboutForView()
        if (!about)
            throw new Meteor.Error('404', 'No found')

        if (!about.company)
            throw new Meteor.Error('404', 'Domain not registered')

        return about.company
    }
}

export const extraLib = new ExtraLib()
