import { HomeDetail, HomeDetailForm } from '/both/models/extra.model'
import { HomesDetail } from '/both/collections/extras.collection'
import { retLang } from '/lib/lang'

function buildNewForm(form: HomeDetailForm, userId: string, image: string) {
    const newForm : HomeDetail = {
        banner: image,
        lang: [{}],
        idOwner: userId
    }

    newForm.lang[retLang(form.lang)] = {
        title: form.title,
        message: form.message
    }

    return newForm
}

function addForm(form: HomeDetailForm, userId: string, image: string) {
    const newForm : HomeDetail = buildNewForm(form, userId, image)
    HomesDetail.insert(newForm)
}

function editForm(form: HomeDetailForm, userId: string, image?: string) {
    const currentForm : HomeDetail = buildNewForm(form, userId, image)
    HomesDetail.update({ 'idOwner': userId }, currentForm)
}

class HomeLib {

    public add(userId: string, form: HomeDetailForm, image: string) {
        let homeForm = this.give()
        if (homeForm && homeForm.banner) {
            console.log('update document')
            editForm(form, userId, image)
        } else {
            console.log('insert new document')
            addForm(form, userId, image)
        }
    }

    public give() {
        return HomesDetail.findOne({})
    }

    public isExist() {
        const homeForm = this.give()
        if (!homeForm)
            throw new Meteor.Error('404', 'Not found')

        return homeForm
    }
}

export const homeLib = new HomeLib()
