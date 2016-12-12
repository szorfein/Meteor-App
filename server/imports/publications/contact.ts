import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Extras } from '/both/collections/extras.collection'

Meteor.publish('contact', function() {
    return Extras.find({ 'title': 'contacten' })
})

Meteor.publish('about', function() {
    return Extras.find({ 'title': 'abouten' })
})

Meteor.publish('index', function() {
    return Extras.find({ 'title': 'indexen' })
})
