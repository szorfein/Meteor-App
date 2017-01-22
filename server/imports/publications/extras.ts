import { AboutsDetail, HomesDetail } from '/both/collections/extras.collection'
import { Meteor } from 'meteor/meteor'

Meteor.publish('pubAbout', function() {
    return AboutsDetail.find({},{skip:0,limit:1})
})

Meteor.publish('pubHome', function() {
    return HomesDetail.find({},{skip:0,limit:1})
})
