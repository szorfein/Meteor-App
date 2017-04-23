import { Pipe, PipeTransform } from '@angular/core'
import { isImageUrl, isMeteorId } from '/lib/validate'
import { Images } from '/both/collections/images.collection'

@Pipe({
    name: 'displayImage'
})

export class DisplayImagePipe implements PipeTransform {
    transform(imageId : string) : string {

        if (!imageId)
            return

        if (isImageUrl(imageId)) {
            return imageId
        }

        let imageUrl : string = ''

        if (isMeteorId(imageId)) {
            let found = Images.findOne(imageId)
            if (found)
                imageUrl = found.url
        }

        return imageUrl
    }
}
