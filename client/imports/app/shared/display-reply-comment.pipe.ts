import { Pipe, PipeTransform } from '@angular/core'
import { Comments } from '/both/collections/comments.collection'
import { C0mment } from '/both/models/comment.model'
import { Observable } from 'rxjs/Observable'

@Pipe({
    name: 'displayReplyComment'
})

export class DisplayReplyCommentPipe implements PipeTransform {
    transform(comment: C0mment) {

        if (!comment) {
            return ''
        }

        let replyComments : Observable<C0mment[]>
        let commentFatherId : string = comment._id

        replyComments = Comments.find({ 'son': commentFatherId }).zone()

        if (replyComments) {
            return replyComments
        }

        return ''
    }
}
