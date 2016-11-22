import { ninja } from '/lib/config'
import { Accounts } from 'meteor/accounts-base'

export function createRootAccount() {

    if (!ninja.username)
        return

    if (!ninja.password)
        return

    if (!ninja.email)
        return
    
    if (Accounts.findUserByUsername(ninja.username)) {
        console.log('Root '+ninja.username+' alrealy exist')
        return
    }

    Accounts.createUser(ninja)
}

