import { Pipe, PipeTransform } from '@angular/core'
import { Images } from '/both/collections/images.collection'
import { Article } from '/both/models/article.model'

@Pipe({
    name: 'displayMainImage'
})

export class DisplayMainImagePipe implements PipeTransform {
    transform(article: Article) {

        if (!article) {
            return
        }

        let imageUrl : string
        let imageId : string = article.image

        const found = Images.findOne({ '_id': imageId }) 

        if (found) {
            imageUrl = found.url
        }

        return imageUrl
    }
}
