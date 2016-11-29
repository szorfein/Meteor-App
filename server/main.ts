import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles'
import { createRootAccount } from '/server/imports/fixtures/root'
import { loadTags } from '/server/imports/fixtures/tags'

import './imports/publications/articles'
import '/both/methods/users.methods'
import './imports/publications/tags'
import './imports/publications/users'

Meteor.startup(() => {
    loadArticles()
    createRootAccount()
    loadTags()
})
