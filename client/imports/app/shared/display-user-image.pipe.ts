import { Pipe, PipeTransform } from '@angular/core'
import { Images } from '/both/collections/images.collection'
import { UsersExt } from '/both/collections/users.collection'
import { User } from '/both/models/user.model'

@Pipe({
    name: 'displayUserImage'
})

export class DisplayUserImagePipe implements PipeTransform {
    transform(user: User) {
        if (!user)
            return ''

        let users = UsersExt.findOne({ 'idOwner': user._id })
        let image : string = ''

        if (users) {
            image = users.objUser.img
        }

        return image
    }
}
