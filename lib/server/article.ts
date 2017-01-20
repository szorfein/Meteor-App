import { Articles } from '/both/collections/articles.collection'
import { Article, ArticleForm } from '/both/models/article.model'
import { Meteor } from 'meteor/meteor'
import { incIndex } from '/lib/index'
            
function buildNewArticle(article: ArticleForm, imageId: string, tagsList: Array<string>) {
    let newArticle : Article = {
        createdAt: new Date(),
        authorId: Meteor.userId(),
        image: imageId,
        bloc: [{
            title: article.title,
            lastEdit: new Date(),
            lastEditOwner: Meteor.userId(),
            description: article.description,
            lang: article.lang,
            article: article.article
        }],
        isPublic: article.isPublic,
        tags: tagsList,
        index: incIndex('articleId')
    }
    return newArticle
}

class ArticleLib {

    public addArticle(article: ArticleForm, imageId: string, tagsList: Array<string>) {

        const newArticle : Article = buildNewArticle(article, imageId, tagsList)
        Articles.insert(newArticle)
    }
}

export const articleLib = new ArticleLib()
