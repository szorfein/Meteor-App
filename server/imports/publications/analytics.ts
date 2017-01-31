import { Analytics } from '/both/collections/analytics.collections'

Meteor.publish('analytics', function() {
    return Analytics.find({})
})
