import { Meteor } from 'meteor/meteor'
import { User, UserExt, RegisterUser, UserBar } from '/both/models/user.model'
import { Users, UsersExt } from '/both/collections/users.collection'

function giveUser(userId: string):User {
    let user = Users.findOne({ '_id': userId })
    return user
}

function tryFoundProfil(userId: string):void {
    let user = UsersExt.findOne({'idOwner': userId})

    if (!user) {
        createUserProfil(userId)
    } 
}

function createUserProfil(userId: string) {
    let user = giveUser(userId)
    const root = isFirstUser(userId)

    if (user) {
        UsersExt.insert({
            name: user.username,
            idOwner: userId,
            admin: root,
            ban: false,
            created: new Date(),
            lastVisit: new Date(),
            objUser: {},
            isPublic: !root
        })
    }
}

function isFirstUser(userId: string):boolean {
    let user : number = Users.find().cursor.count()
    return (user === 1)
}

function sendUserBar(userId: string):UserBar {
    let user = UsersExt.findOne({ 'idOwner': userId })
    let userbar : UserBar = { username: '' }
    if (user) 
        userbar.username = user.username

    return userbar
}

function isLogged(userId: string) {
    return !!userId
}

function isUserOrEmailAlrealyExist(newNinja : RegisterUser) {
    const user = Users.find({ $or: [
        { username: newNinja.username },
        { 'emails.address': newNinja.email }
    ]})
    return !!(user && user.username || user.email)
}

class UserLib {

    public returnAdmin(userId: string) {
        let ninja : UserBar

        if (this.isAdmin(userId)) {
            ninja = this.findUserInfoBar(userId)
        }
        return ninja
    }

    public findUserInfoBar(userId: string) {
        let user = giveUser(userId)
        tryFoundProfil(userId)
        let userBar = sendUserBar(userId)
        return userBar
    }

    //TODO : add filter for username, password and email
    public ctrl(newNinja: RegisterUser) {
        if (Meteor.userId())
            throw new Meteor.Error('404', 'You are alrealy logged')

        if (isUserOrEmailAlrealyExist(newNinja)) 
            throw new Meteor.Error('404', 'username or email alrealy exist')
    }

    public isAdmin(userId: string):boolean {
        let root = UsersExt.findOne({
            $and: [
                { 'idOwner': userId },
                { 'admin': true },
                { 'isPublic': false }
            ]
        })
        return !!root
    }
}

export const userLib = new UserLib()
