import { Meteor } from 'meteor/meteor'

export function isLogged() {
    return !!Meteor.user()
}
