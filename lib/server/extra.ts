import { AboutDetail, AboutDetailForm, SocialTag } from '/both/models/extra.model'
import { AboutsDetail } from '/both/collections/extras.collection'

function noneByDefault(text: string) {
    if (text)
        return text
    else
        return ''
}

function buildAbout(about: AboutDetailForm, userId: string) {
    const newAbout : AboutDetail = {
        image: noneByDefault(about.image),
        idOwner: userId,
        name: about.name,
        company: noneByDefault(about.company),
        aboutCompany: [
            { lang: noneByDefault(about.lang), yourCompany: noneByDefault(about.aboutCompany)}
        ],
        jobName: [
            { lang: noneByDefault(about.lang), yourjob: noneByDefault(about.jobName) }
        ],
        mail: noneByDefault(about.mail),
        telMobile: noneByDefault(about.mobile),
        telFix: noneByDefault(about.fix),
        fax: noneByDefault(about.fax),
        aboutYourSelf: [
            { lang: noneByDefault(about.lang), yourself: noneByDefault(about.aboutMe) }
        ],
        address: noneByDefault(about.address),
        facebookLink: noneByDefault(about.facebook),
        githubLink: noneByDefault(about.github),
        twitterLink: noneByDefault(about.twitter),
        dotshareLink: noneByDefault(about.dotshare),
        imgurLink: noneByDefault(about.imgur),
        redditLink: noneByDefault(about.reddit)
    }
    return newAbout
}

function giveThisForm(userId: string) {
    const about = AboutsDetail.findOne({ 'idOwner': userId })
    return about
}

function buildSocialList(social : AboutDetail) {
    const socialTag : SocialTag = {
        facebook : noneByDefault(social.facebookLink),
        github : noneByDefault(social.githubLink),
        twitter : noneByDefault(social.twitterLink),
        dotshare : noneByDefault(social.dotshareLink),
        imgur : noneByDefault(social.imgurLink),
        reddit : noneByDefault(social.redditLink)
    }
    return socialTag
}

class ExtraLib {

    public addAbout(about : AboutDetailForm, userId : string) {
        const newAbout : AboutDetail = buildAbout(about, userId)
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

    public giveSocialList() : SocialTag {
        const socialList : AboutDetail = this.returnAboutForView()
        if (!socialList)
            throw new Meteor.Error('404', 'No social tag found')

        return buildSocialList(socialList)
    }
}

export const extraLib = new ExtraLib()
