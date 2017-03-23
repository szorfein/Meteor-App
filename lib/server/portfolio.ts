import { Imgur } from '/server/main.config'
import { ImgurLinks } from '/both/collections/portfolios.collection'
import { isGallery, isAlbum, isImage } from '/lib/validate'

class PortfolioLib {

    isAlbum : boolean = false
    
    private ifExist(link : string) {
        const found = ImgurLinks.findOne({ 'link': link })
        if (found) 
            throw new Meteor.Error('403', 'Link alrealy exist')
    }

    private register(link : string, userid : string, idImgur : string) {
        this.ifExist(link)
        const newLink = {
            submitAt : new Date(),
            owner : userid,
            link : link,
            idImgur : idImgur
        }
        ImgurLinks.insert(newLink)
    }

    public setting() {
        const conf = Imgur
        return conf 
    }

    public add(linkForm : string, userid : string) {
        if (isAlbum(linkForm)) {
            let linkSplit = linkForm.split(/\//)
            this.register(linkForm, userid, linkSplit[4])
        } else if (isImage(linkForm)) {
            let linkSplit = linkForm.split(/\//)
            let imgSplit = linkSplit[3].split(/\./)
            this.register(linkForm, userid, imgSplit[0])
        } else if (isGallery(linkForm)) {
            let linkSplit = linkForm.split(/\//)
            this.register(linkForm, userid, linkSplit[4])
        } else
            throw new Meteor.Error('404', 'Error link submit')
    }
}

export const portfolioLib = new PortfolioLib()
