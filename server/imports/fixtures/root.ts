import { ninja } from '/lib/config.js'
import { Accounts } from 'meteor/accounts-base'

export function createRootAccount() {

    this.newRoot = ninja

    if (!this.newRoot.username)
        return

    if (!this.newRoot.password)
        return

    if (!this.newRoot.email)
        return
    
    if (Accounts.findUserByUsername(this.newRoot.username)) {
        console.log('Root '+this.newRoot.username+' alrealy exist')
        return
    }

    Accounts.createUser(this.newRoot)
}

