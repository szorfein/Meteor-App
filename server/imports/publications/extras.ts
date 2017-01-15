import { AboutsDetail } from '/both/collections/extras.collection'
import { Meteor } from 'meteor/meteor'

Meteor.publish('pubAbout', function() {
    return AboutsDetail.find()
})
