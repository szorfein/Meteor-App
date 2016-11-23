import { Meteor } from 'meteor/meteor'
import { Tags } from '/both/collections/tags.collection'

Meteor.publish('tags', function() {
    return Tags.find(buildQuery.call(this))
})

function buildQuery(): Object {
    const isAvailable = {
        $or: [{ 
            name: { $exists: true } 
        },
        {
            $and: [
                { name: { $exists: true } }
            ]
        }]
    }
    return isAvailable
}
