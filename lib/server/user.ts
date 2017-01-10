import { User, RegisterUser, UserBar } from '/both/models/user.model'
import { Users } from '/both/collections/users.collection'
import { UsersExt } from '/both/collections/usersext.collection'

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

function sendUserBar(userId):UserBar {
    let user = UsersExt.findOne({ 'idOwner': userId })
    let userbar : UserBar = { username: '' }
    if (user)
        userbar = { username: user.username }

    return userbar
}

class UserLib {

    public isAlrealyRegister(newNinja : RegisterUser) {
        const user = Users.find({ $or: [
            { username: newNinja.username },
            { 'emails.address': newNinja.email }
        ]})
        return !!user
    }

    public findUserInfoBar(userId: string) {
        let user = giveUser(userId)
        tryFoundProfil(userId)
        let userBar = sendUserBar(userId)
        return userBar
    }
}

export const userLib = new UserLib()
