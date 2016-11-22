import { C0mm3nts } from '/both/collections/comments.collection'
import { C0mm3nt } from '/both/models/comment.model'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

function isCleanComment() {
    return (C0mm3nts.find().cursor.count() === 0)
}

function isExistArticle() {
    return (Articles.find().cursor.count() === 1)
}

export function loadComment() {
    console.log('loadComment vaut -> ' + (isCleanComment && isExistArticle))
    if (isCleanComment && isExistArticle) {

    }
}
