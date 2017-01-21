import { Meteor } from 'meteor/meteor'
import { ArticleForm } from '/both/models/article.model'
import { check } from 'meteor/check'

Meteor.methods({

    insArticle: function(article: ArticleForm, image: string, tags: Array<string>) {
        check(image, String)
        check(tags, [String])

        if (Meteor.isServer) {
            const { articleLib } = require('/lib/server/article')
            articleLib.addArticle(article, image, tags)
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
