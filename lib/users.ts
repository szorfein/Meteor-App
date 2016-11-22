import { Meteor } from 'meteor/meteor'

export function isLogged() {
    console.log('Will return -> ' + !!Meteor.user())
    return !!Meteor.user()
}
