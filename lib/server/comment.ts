import { tag , isMeteorId } from '/lib/validate'
import { articleLib } from './article'
import { indexLib } from './index'
import { C0mment, CommentFormWithoutLoggin } from '/both/models/comment.model'
import { Comments } from '/both/collections/comments.collection'

class CommentLib {
    
    public add(idArticle : string) {
        this.checkCommentIndex(idArticle)
        indexLib.inc('comm_'+idArticle)
        articleLib.updateComment(idArticle)
    }

    public remove(postId : string, idArticle : string) {
        this.hasSon(postId)
        indexLib.dec('comm_'+idArticle)
        this.del(postId)
        articleLib.updateComment(idArticle)
    }

    private checkCommentIndex(idArticle : string) {
        if (articleLib.isExist(idArticle)) {
            indexLib.create('comm_'+idArticle)
        }
    }

    private del(idArticle : string) {
        Comments.remove(idArticle)
    }

    private hasSon(postId : string) {
        let post : C0mment
        if (isMeteorId(postId)) {
            post = Comments.findOne({ son : postId })
        }
        
        if (!!post)
            throw new Meteor.Error('404','This post has somes childs and cannot be delete')
    }
}

export const commentLib = new CommentLib()
