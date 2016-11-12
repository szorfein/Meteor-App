import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles.ts'

Meteor.startup(() => {
    loadArticles()
})
