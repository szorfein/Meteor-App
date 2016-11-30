import { Comments } from '/both/collections/comments.collection'
import { C0mment } from '/both/models/comment.model'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

function isCleanComment() {
    return (Comments.find().cursor.count() === 0)
}

function isExistArticle() {
    return (Articles.find().cursor.count() === 1)
}

export function loadComment() {
    console.log('loadComment vaut -> ' + (isCleanComment && isExistArticle))
    if (isCleanComment && isExistArticle) {

    }
}
