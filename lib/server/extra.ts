import { AboutDetail, AboutDetailForm } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'

function noneByDefault(text: string) {
    if (text)
        return text
    else
        return ''
}

function buildAbout(about: AboutDetailForm, userId: string, imageId: string) {
    const newAbout : AboutDetail = {
        image: noneByDefault(imageId),
        idOwner: userId,
        name: about.name,
        company: noneByDefault(about.company),
        aboutCompany: [
            { lang: noneByDefault(about.lang), yourCompany: noneByDefault(about.aboutCompany)}
        ],
        jobName: [
            { lang: noneByDefault(about.lang), yourjob: noneByDefault(about.jobName) }
        ],
        skill: noneByDefault(about.skill),
        mail: noneByDefault(about.mail),
        telMobile: noneByDefault(about.mobile),
        telFix: noneByDefault(about.fix),
        fax: noneByDefault(about.fax),
        aboutYourSelf: [
            { lang: noneByDefault(about.lang), yourself: noneByDefault(about.aboutMe) }
        ],
        address: noneByDefault(about.address),
        facebook: noneByDefault(about.facebook),
        github: noneByDefault(about.github),
        twitter: noneByDefault(about.twitter),
        dotshare: noneByDefault(about.dotshare),
        imgur: noneByDefault(about.imgur),
        reddit: noneByDefault(about.reddit)
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
