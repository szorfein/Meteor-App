import { Articles } from '/both/collections/articles.collection'
import { Article, ArticleForm } from '/both/models/article.model'
import { Meteor } from 'meteor/meteor'
import { isMeteorId } from '../validate'
import { indexLib } from './index'
            
function buildNewArticle(article: ArticleForm, imageId: string, tagsList: Array<string>) {
    indexLib.inc('articleId')
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
        index: indexLib.returnIndex('articleId'),
        pastToFooter: article.toFooter
    }
    return newArticle
}

class ArticleLib {

    public isExist(articleId: string) : boolean {
        let article : Article

        if (isMeteorId(articleId)) 
            article = Articles.findOne(articleId)

        return !!article
    }

    public addArticle(article: ArticleForm, imageId: string, tagsList: Array<string>) {
        const newArticle : Article = buildNewArticle(article, imageId, tagsList)
        Articles.insert(newArticle)
    }

    public upd(article : ArticleForm, imageId : string, tags : Array<string>, id : string) {
        Articles.update(id, {
            $set: {
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
                tags: tags,
                pastToFooter: article.toFooter
            }
        })
    }

    public remove(articleId: string) {
        if (this.isExist(articleId)) {
            Articles.remove(articleId)
            indexLib.dec('articleId')
        }
    }

    public updateComment(idArticle : string) {
        if (isMeteorId(idArticle)) {
            Articles.update(idArticle, {
                $set: {
                    commentNb: indexLib.returnIndex('comm_'+idArticle)
                }
            })
        }
    }

    public incViewArticle(idArticle : string) {
        if (isMeteorId(idArticle)) {
            indexLib.create('view_'+idArticle)
            indexLib.inc('view_'+idArticle)
            this.updateView(idArticle)
        }
    }

    private updateView(idArticle : string) {
        Articles.update(idArticle, {
            $set: {
                view: indexLib.returnIndex('view_'+idArticle)
            }
        })
    }
}

export const articleLib = new ArticleLib()
