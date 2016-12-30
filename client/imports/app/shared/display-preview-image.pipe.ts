import { Pipe, PipeTransform } from '@angular/core'
import { Images } from '/both/collections/images.collection'

@Pipe({
    name: 'previewImage'
})

export class DisplayPreviewImage implements PipeTransform {
    transform(image: string) {

        if (!image)
            return

        let imageUrl : string
        const found = Images.findOne({ '_id': image })

        if (found)
            imageUrl = found.url

        return imageUrl
    }
}
