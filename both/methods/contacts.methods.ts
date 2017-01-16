import { Meteor } from 'meteor/meteor'
import { Contact, ContactForm } from '/both/models/contact.model'

Meteor.methods({
    addContact: function(form: ContactForm) {

        if (Meteor.isServer) {
            const { contactLib } = require('/lib/server/contact')
            contactLib.createNewContact(form)
        }
        console.log('user has id -> ' + this.userId)
    }
})
