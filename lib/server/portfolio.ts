import { Imgur } from '/server/main.config'
import { ImgurLinks } from '/both/collections/portfolios.collection'

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
            album : this.isAlbum,
            idImgur : idImgur

        }
        ImgurLinks.insert(newLink)
    }

    public setting() {
        const conf = Imgur
        return conf 
    }

    public add(linkForm : string, userid : string) {
        if (/https:\/\/imgur.com\/a\/([\w]{5})/i.test(linkForm)) {
            let linkSplit = linkForm.split(/\//)
            this.isAlbum = true
            this.register(linkForm, userid, linkSplit[4])
        } else if (/https:\/\/i.imgur.com\/([\w]{7}).(png|jpeg)/i.test(linkForm)) {
            let linkSplit = linkForm.split(/\//)
            this.isAlbum = false
            let imgSplit = linkSplit[3].split(/\./)
            this.register(linkForm, userid, imgSplit[0])
        } else
            throw new Meteor.Error('404', 'Error link submit')
    }
}

export const portfolioLib = new PortfolioLib()
