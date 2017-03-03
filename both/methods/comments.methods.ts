import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Comments } from '/both/collections/comments.collection'
import { C0mment, CommentFormWithoutLoggin } from '/both/models/comment.model'
import { UsersExt } from '/both/collections/users.collection'
import { UserExt } from '/both/models/user.model'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

function giveTitle(articleId: string, lang: string) {
    const article = Articles.findOne({ $and: [{'_id':articleId}, {'bloc.lang':lang}] })
    if (article) 
        return article.bloc[0].title

    throw new Meteor.Error('404', 'Article not found')
}

function newComment(articleId: string, post: string) {
    Comments.insert({
        poster: Meteor.userId(),
        posted: new Date(),
        lastposted: new Date(),
        father: articleId,
        son: '',
        post: post
    })
}

function ctrlArgs(articleId : string, post : string) {
    check(articleId, String)
    check(post, String)
}

function editUserProfile(articleId : string) {
    let title = giveTitle(articleId, 'en')
    let commentList = giveCommentList(title)
    UsersExt.update({ 'idOwner': Meteor.userId() }, {
        $set: {
            comment: commentList
        }
    })
}

function giveCommentList(newtitle : string) {
    var userinfo = UsersExt.findOne({ 'idOwner': Meteor.userId() })
    if (!!userinfo) 
        var newList = new Set(userinfo.comment)
    else 
        throw new Meteor.Error('404', 'GiveComment -> Not Found')

    if (!newList.has(newtitle)) {
        console.log('newlist do not contain '+newtitle)
        newList.add(newtitle)
    }
    return Array.from(newList)
}
            
function newCommentWithoutForm(articleId : string, form : CommentFormWithoutLoggin) {

}

Meteor.methods({
    AddComment: function(articleId : string, post : string) : void {

        if (!ctrlArgs(articleId, post))
            throw new Meteor.Error('404', 'Arguments problem')

        if (Meteor.isServer) {
            newComment(articleId, post)
            editUserProfile(articleId)
        }
    },

    AddCommentWithoutRegister: function(articleId : string, form : CommentFormWithoutLoggin) {
        check(articleId, String)

        if (this.userId)
            throw new Meteor.Error('404', 'bad form, user alrealy logged')

        if (Meteor.isServer) {
            newCommentWithoutForm(articleId, form)
        }
    },

    DelComment: function(articleId: string) {
    }
})
