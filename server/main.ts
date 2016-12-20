import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles'
import { createRootAccount } from '/server/imports/fixtures/root'
import { loadTags } from '/server/imports/fixtures/tags'

import '/both/methods/users.methods'
import '/both/methods/comments.methods'

import './imports/publications/articles'
import './imports/publications/tags'
import './imports/publications/users'
import './imports/publications/comments'
import './imports/publications/contact'
import './imports/publications/images'

Meteor.startup(() => {
    loadArticles()
    createRootAccount()
    loadTags()
})
