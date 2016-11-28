import { Meteor } from 'meteor/meteor'

export function isLogged() {
    console.log('/lib/user isLooged() Will return -> ' + !!Meteor.user())
    return !!Meteor.user()
}
