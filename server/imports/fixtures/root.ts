import { ninja } from '/server/main.config'
import { Accounts } from 'meteor/accounts-base'

export function createRootAccount() {

    if (!ninja.username) {
        console.log('username for admin not defined.')
        return
    }

    if (!ninja.password) {
        console.log('password for admin not defined.')
        return
    }

    if (!ninja.email) {
        console.log('email for admin not defined.')
        return
    }
    
    // admin alrealy exist
    if (Accounts.findUserByUsername(ninja.username))
        return

    Accounts.createUser(ninja)
    console.log('Admin ' +ninja.username+ ' had been created')
}
