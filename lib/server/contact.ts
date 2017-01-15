import { Contact, ContactForm } from '/both/models/contact.model'
import { Contacts } from '/both/collections/contacts.collection'

function buildNewForm(form: ContactForm) {
    const newForm : Contact = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        createdAd: new Date()
    }
    return newForm
}

function addForm(form: ContactForm) {
    const newForm : Contact = buildNewForm(form)
    Contacts.insert({
        newForm
    })
}

class ContactLib {

    public createNewContact(form: ContactForm) {
        addForm(form)
    }
}


export const contactLib = new ContactLib()
