import { Pipe, PipeTransform } from '@angular/core'
import { isMeteorId, tag } from '/lib/validate'
import { User } from '/both/models/user.model'
import { Users } from '/both/collections/users.collection'

@Pipe({
    name: 'displayNameWithId'
})

export class DisplayNameWithIdPipe implements PipeTransform {
    transform(userId : string) : string {
        
        if (!userId)
            return ''

        let username : string = ''
        let user : User

        if (isMeteorId(userId)) {
            user = Users.findOne(userId)
            if (user) {
                username = user.username
            }
        } else if (tag(userId)) {
            username = userId
        }

        return username
    }
}
