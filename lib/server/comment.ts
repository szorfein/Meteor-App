import { tag , isMeteorId } from '/lib/validate'
import { articleLib } from './article'
import { indexLib } from './index'
import { C0mment, CommentFormWithoutLoggin } from '/both/models/comment.model'
import { Comments } from '/both/collections/comments.collection'

class CommentLib {
    
    public add(articleId : string, post : string, son : string, username : string) {
        this.checkCommentIndex(articleId)
        indexLib.inc('comm_'+articleId)
        articleLib.updateComment(articleId)
        this.newComment(articleId, post, son, username)
    }

    private newComment(articleId : string, post : string, sonId: string, user : string) {
        Comments.insert({
            poster: user,
            posted: new Date(),
            lastposted: new Date(),
            father: articleId,
            son: sonId,
            post: post
        })
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
