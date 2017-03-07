import { tag , isMeteorId } from '/lib/validate'
import { incIndex , decIndex } from '/lib/index'
import { articleLib } from './article'
import { indexLib } from './index'

class CommentLib {
    
    public add(idArticle : string) {
        this.checkCommentIndex(idArticle)
    }

    public remove(idArticle : string) {
        indexLib.decIndex(idArticle)
    }

    private checkCommentIndex(idArticle : string) {
        if (articleLib.isExist(idArticle)) {
            indexLib.create(idArticle)
        }
    }
}

export const commentLib = new CommentLib()
