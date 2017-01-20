import { Pipe, PipeTransform } from '@angular/core'
import { Users } from '/both/collections/users.collection'

@Pipe({
    name: 'displayNameWithId'
})

export class DisplayNameWithIdPipe implements PipeTransform {
    transform(userId: string):string {
        
        if (!userId)
            return ''

        let username : string = ''
        let user = Users.findOne(userId)

        if (user)
            username = user.username

        return username
    }
}
