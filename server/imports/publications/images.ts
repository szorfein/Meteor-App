import { Images } from '/both/collections/images.collection'

Meteor.publish('images', function() {
    return Images.collection.find({},{skip:0,limit:1})
})
