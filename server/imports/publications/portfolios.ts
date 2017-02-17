import { ImgurLinks } from '/both/collections/portfolios.collection'

Meteor.publish('imgurLatest', function() {
    return ImgurLinks.find({}, {skip:0,limit:3,sort: {'submitAt': -1}})
})

Meteor.publish('portfolioList', function() {
    return ImgurLinks.find({},{skip:0,limit:12,sort:{'submitAt': -1}})
})
