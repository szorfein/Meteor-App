import { Pipe, PipeTransform } from '@angular/core'
import { Images } from '/both/collections/images.collection'
import { UsersExt } from '/both/collections/users.collection'
import { User } from '/both/models/user.model'

@Pipe({
    name: 'displayUserImage'
})

export class DisplayUserImagePipe implements PipeTransform {
    transform(userId: string) {

        let image : string = '/img/anonyme_user.png'

        if (!userId)
            return image

        let users = UsersExt.findOne({ 'idOwner': userId })

        if (users)
            image = users.objUser.img

        return image
    }
}
