import { Meteor } from 'meteor/meteor'

import { loadIndexes } from '/server/imports/fixtures/index'
import { loadArticles } from '/server/imports/fixtures/articles'
import { createRootAccount } from '/server/imports/fixtures/root'
import { loadTags } from '/server/imports/fixtures/tags'
import { loadCaptcha } from '/server/imports/fixtures/captchas'

import '/both/methods/users.methods'
import '/both/methods/comments.methods'
import '/both/methods/captcha.methods'
import '/both/methods/extras.methods'
import '/both/methods/contacts.methods'
import '/both/methods/articles.methods'
import '/both/methods/analytics.methods'
import '/both/methods/homes.methods'
import '/both/methods/portfolio.methods'

import './imports/publications/articles'
import './imports/publications/tags'
import './imports/publications/users'
import './imports/publications/comments'
import './imports/publications/contact'
import './imports/publications/images'
import './imports/publications/captchas'
import './imports/publications/extras'
import './imports/publications/indexes'
import './imports/publications/analytics'

Meteor.startup(() => {
    loadIndexes()
    loadArticles()
    createRootAccount()
    loadTags()
    loadCaptcha()
})
