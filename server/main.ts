import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles'
import { createRootAccount } from '/server/imports/fixtures/root'

import './imports/publications/articles'

Meteor.startup(() => {
    loadArticles()
    createRootAccount()
})
