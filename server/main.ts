import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles'
import { createRootAccount } from '/server/imports/fixtures/root'
import { loadTags } from '/server/imports/fixtures/tags'

import './imports/publications/articles'
import './imports/publications/tags'

Meteor.startup(() => {
    loadArticles()
    createRootAccount()
    loadTags()
})
