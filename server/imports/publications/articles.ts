import { Meteor } from 'meteor/meteor'
import { Articles } from '/both/collections/articles.collection'

Meteor.publish('articles', function() {
    return Articles.find(buildQuery.call(this))
})

Meteor.publish('article', function(articleId: string) {
    return Articles.find(buildQuery.call(this, articleId))
})

function buildQuery(articleId?: string): Object {
    const isAvailable = {
        $or: [{
            // article is public
            isPublic: true
        },
        // or
        {
            // current user is the owner
            $and: [{
                authorId: this.userId
            },
            {
                authorId: {
                    $exists: true
                }
            }]
        }]
    }
    if (articleId) {
        return {
            // only single article
            $and: [{
                _id: articleId
            },
            isAvailable
            ]
        }
    }
    return isAvailable
}
