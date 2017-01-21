import { Articles } from '/both/collections/articles.collection'
import { Article, ArticleForm } from '/both/models/article.model'
import { Meteor } from 'meteor/meteor'
import { incIndex, decIndex } from '/lib/index'
            
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

function isExist(articleId: string) {
    const article : Article = Articles.findOne(articleId)
    if (!article)
        throw new Meteor.Error('404', 'Article unknown...')
}

class ArticleLib {

    public addArticle(article: ArticleForm, imageId: string, tagsList: Array<string>) {

        const newArticle : Article = buildNewArticle(article, imageId, tagsList)
        Articles.insert(newArticle)
    }

    public remove(articleId: string) {
        isExist(articleId)
        Articles.remove(articleId)
        decIndex('articleId')
    }
}

export const articleLib = new ArticleLib()
