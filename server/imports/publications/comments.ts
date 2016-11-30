import { Meteor } from 'meteor/meteor'
import { Comments } from '/both/collections/comments.collection'
import { check } from 'meteor/check'

Meteor.publish('comments', function(fatherId: string) {
    check(fatherId, String)
    return Comments.find(buildQuery.call(this, fatherId))
})

function buildQuery(fatherId: string):Object {
    return { $and: [ 
        { post: { $exists: true } },
        { father: fatherId }
    ] }
}
