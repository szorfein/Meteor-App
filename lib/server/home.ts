import { HomeDetail, HomeDetailForm } from '/both/models/extra.model'
import { HomesDetail } from '/both/collections/extras.collection'

function buildNewForm(form: HomeDetailForm, userId: string, image: string) {
    const newForm : HomeDetail = {
        banner: image,
        welcome: [
            { lang: form.welcome_lang },
            { message: form.welcome_message }
        ],
        idOwner: userId
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
            editForm(form, image)
        } else {
            addForm(form, userId, image)
        }
    }

    public give() {
        return HomesDetail.findOne({})
    }
}

export const homeLib = new HomeLib()
