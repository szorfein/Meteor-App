import { Contact } from '/both/models/contact.model'
import { MongoObservable } from 'meteor-rxjs'
import { isRoot } from '/lib/users'

export const Contacts = new MongoObservable.Collection<Contact>('contacts')

Contacts.allow({
    remove: function(userId: string) {
        return isRoot(userId)
    }
})

