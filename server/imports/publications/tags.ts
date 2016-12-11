import { Meteor } from 'meteor/meteor'
import { Tags } from '/both/collections/tags.collection'

Meteor.publish('tags', function() {
    return Tags.find({
        $and: [ 
            { name: { $exists: true } }
        ] 
    })
})
