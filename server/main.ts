import { Meteor } from 'meteor/meteor'

import { loadArticles } from '/server/imports/fixtures/articles'
import { createRootAccount } from '/server/imports/fixtures/root'
import { loadTags } from '/server/imports/fixtures/tags'
import { loadCaptchaIndex, loadCaptcha } from '/server/imports/fixtures/captchas'

// Public method
import '/both/methods/users.methods'
import '/both/methods/comments.methods'
import '/both/methods/captcha.methods'

// Server method
import '/lib/server/captcha'

// Publication
import './imports/publications/articles'
import './imports/publications/tags'
import './imports/publications/users'
import './imports/publications/comments'
import './imports/publications/contact'
import './imports/publications/images'
import './imports/publications/captchas'

Meteor.startup(() => {
    loadArticles()
    createRootAccount()
    loadTags()
    loadCaptchaIndex()
    loadCaptcha()
})
