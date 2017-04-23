import { Images } from '/both/collections/images.collection'
import { isMeteorId } from '/lib/validate'

Meteor.publish('images', function() {
    return Images.collection.find({})
})

Meteor.publish('image', function(imageId : string) {
    if (isMeteorId(imageId)) 
        return Images.collection.find({ '_id': imageId },{ skip:0,limit:1 })
})
