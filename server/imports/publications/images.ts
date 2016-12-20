import { Meteor } from 'meteor/meteor'
import { Images } from '/both/collections/images.collection'

Meteor.publish('images', function() {
    return Images.collection.find({})
})
