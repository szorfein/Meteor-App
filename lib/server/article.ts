import { Articles } from '/both/collections/articles.collection'
import { Article, ArticleForm } from '/both/models/article.model'
import { Meteor } from 'meteor/meteor'
import { isMeteorId } from '../validate'
import { retLang } from '/lib/lang'
import { indexLib } from './index'
            
function buildNewArticle(article: ArticleForm, imageId: string, tagsList: Array<string>) {
    indexLib.inc('articleId')
    let newArticle : Article = {
        createdAt: new Date(),
        authorId: Meteor.userId(),
        lastEdit: new Date(),
        lastEditOwner: Meteor.userId(),
        image: imageId,
        lang: [{}],
        isPublic: article.isPublic,
        tags: tagsList,
        index: indexLib.returnIndex('articleId'),
        pastToFooter: article.toFooter
    }
    newArticle.lang[retLang(article.lang)] = {
        title: article.title,
        description: article.description,
        article: article.article
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
        const articleOld = Articles.findOne(id)
        if (!articleOld)
            throw new Meteor.Error('404', 'Article not found !')

        const updLang = articleOld.lang
        updLang[retLang(article.lang)] = {
            title: article.title,
            description: article.description,
            article: article.article
        }

        Articles.update(id, {
            $set: {
                lastEdit: new Date(),
                lastEditOwner: Meteor.userId(),
                image: imageId,
                lang: updLang,
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
