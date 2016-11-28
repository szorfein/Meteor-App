import { UsersExt } from '../collections/users.collection'
import { UserExt } from '/both/models/user.model'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

function isRegister(name: string):boolean {
    var user = Accounts.findUserByUsername(name)
    return !!user
}

function isRegisterFromUserExt(userId: string):boolean {
    let user = UsersExt.collection.findOne({ 'idOwner': userId })
    return !!user
}

function isRoot(userId: string):boolean {
    let user = UsersExt.collection.findOne({ $and: [ { 'idOwner': userId, 
                                               'admin': true } ] })
    return !!user
}

function isFirstUser():boolean {
    return (Meteor.users.find().count() === 1)
}

function registerAdmin(userId: string, userName: string):void {
    UsersExt.insert({
        name: userName,
        idOwner: userId,
        admin: true,
        ban: false,
        created: new Date(),
        lastVisit: new Date(),
        objUser: {},
        isPublic: false
    })
    console.log('Admin has been created')
}

function registerNormalUser(userId: string, userName: string):void {
    UsersExt.insert({
        name: userName,
        idOwner: userId,
        admin: false,
        ban: false,
        created: new Date(),
        lastVisit: new Date(),
        objUser: {},
        isPublic: false
    })
    console.log('User has been created')
}

Meteor.methods({

    createUserProfil: function(userId: string, userName: string):void {
        check(userId, String)
        check(userName, String)

        if (isRegisterFromUserExt(userId)) 
            throw new Meteor.Error('400', 'User alrealy created')

        if (Meteor.isServer) {

            // isRegister is only server side
            if (!isRegister(userName))
                throw new Meteor.Error('403', 'No permissions')

            // Only first user is condiderate as Admin
            if (isFirstUser && !isRegisterFromUserExt(userId))
                registerAdmin(userId, userName)

            if (!isFirstUser && isRegister(userName) && !isRegisterFromUserExt(userId)) 
                registerNormalUser(userId, userName)
        }
    }
})
