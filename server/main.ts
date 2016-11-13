import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles'

import './imports/publications/articles'

Meteor.startup(() => {
    loadArticles()
})
