import { UsersExt } from '/both/collections/usersext.collection'
import { UserExt } from '/both/models/userext.model'
import { User, RegisterUser } from '/both/models/user.model'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

function isRegister(name: string):boolean {
    const user = Accounts.findUserByUsername(name)
    return !!user
}

function isRegisterFromUserExt(userid: string, username: string):boolean {
    let user = UsersExt.collection.findOne({
        $or: [
            { 'idOwner': userid },
            { 'name': username }
        ]
    })
    return !!user
}

function isRoot(userId: string):boolean {
    let user = UsersExt.collection.findOne({ $and: [ { 'idOwner': userId, 
                                               'admin': true } ] })
    return !!user
}

function isFirstUser():boolean {
    console.log('isFirstUser return ->' + ((Meteor.users.find().count()) === 1))
    return (Meteor.users.find().count() === 1)
}

function registerUser(userid: string, username: string):void {
    let root: boolean

    root = isFirstUser() ? true : false
    UsersExt.insert({
        name: username,
        idOwner: userid,
        admin: root,
        ban: false,
        created: new Date(),
        lastVisit: new Date(),
        objUser: {},
        isPublic: false
    })
}

Meteor.methods({

    createUserProfil: function(user: User):void {

        if (!user.username)
            throw new Meteor.Error('401', 'param undefined')
        
        if (!this.userId) 
            throw new Meteor.Error('404', 'no permission')

        if (Meteor.isServer && !!user.username) {

            if (isRegisterFromUserExt(user._id, user.username)) 
                throw new Meteor.Error('200', 'User alrealy created')

            if (!isRegister(user.username))
                throw new Meteor.Error('401', 'No permissions')

            registerUser(user._id, user.username)
        }
    },
    createNewNinja: function(newNinja: RegisterUser) {
        check(newNinja.email, String)
        check(newNinja.password, String)
        check(newNinja.username, String)

        if (Meteor.isServer) {
            const { userLib } = require('/lib/server/user')
            Accounts.createUser({
                email: newNinja.email,
                password: newNinja.password,
                username: newNinja.username
            })
        }
    }
})
