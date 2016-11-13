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
            public: true
        },
        // or
        {
            // current user is the owner
            $and: [{
                owner: this.userId
            },
            {
                owner: {
                    $exists: true
                }
            }]
        }]
    }

    if (articleId) {
        return {
            $and: [{
                _id: articleId
            },
            isAvailable
            ]
        }
    }
    return isAvailable
}
