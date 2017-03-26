import { Meteor } from 'meteor/meteor'
import { ArticleForm } from '/both/models/article.model'
import { check } from 'meteor/check'

Meteor.methods({

    insArticle: function(article: ArticleForm, image: string, tags: Array<string>) {
        check(image, String)
        check(tags, [String])
        console.log('METHOD ins: LANG Choose -> ' + article.lang)

        if (Meteor.isServer) {
            const { articleLib } = require('/lib/server/article')
            articleLib.addArticle(article, image, tags)
        }
    },

    updArticle: function(article: ArticleForm, image: string, tags: Array<string>, id:string) {
        check(image, String)
        check(tags, [String])
        check(id, String)
        console.log('METHOD udp: LANG Choose -> ' + article.lang)

        if (Meteor.isServer) {
            const { articleLib } = require('/lib/server/article')
            articleLib.upd(article, image, tags, id)
        }
    },

    remArticle: function(articleId: string) {
        check(articleId, String)

        if (Meteor.isServer) {
            const { articleLib } = require('/lib/server/article')
            articleLib.remove(articleId)
        }
    }
})
