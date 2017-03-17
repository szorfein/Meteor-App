import { Indexes } from '/both/collections/indexes.collection'
import { isMeteorId } from '/lib/validate'

enum Keyword {
    stat
}

Meteor.publish('index', function(meteorId : string, keyword : string) {
    console.log('index assemble -> ' + Keyword[0] + meteorId)
    if (isMeteorId(meteorId)) {
        if (keyword == Keyword[0]) {
            return Indexes.find( { _id: Keyword[0]+meteorId },{skip:0,limit:1})
        }
    }
    throw new Meteor.Error('404', 'Cursor not found')
})

Meteor.publish('indexArticle', () => {
    return Indexes.find({_id: 'articleId'},{skip:0,limit:1})
})

Meteor.publish('indexCaptcha', () => {
    return Indexes.find({_id: 'captchaId'},{skip:0,limit:1})
})
