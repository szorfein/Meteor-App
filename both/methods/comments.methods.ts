import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Comments } from '/both/collections/comments.collection'
import { C0mment } from '/both/models/comment.model'
import { UsersExt } from '/both/collections/usersext.collection'
import { UserExt } from '/both/models/userext.model'
import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

function giveTitle(articleId: string, lang: string):string {
    const article = Articles.findOne({ $and: [{'_id':articleId}, {'bloc.lang':lang}] })
    if (article) return article.bloc[0].title
        else
            throw new Meteor.Error('404', 'Article not found')
}

function newComment(articleId: string, username: string, post: string):void {
        Comments.insert({
            poster: username,
            posted: new Date(),
            lastposted: new Date(),
            father: articleId,
            post: post
        })
}

function ctrlArgs(articleid: string, username: string, post:string):boolean {
        check(articleid, String)
        check(username, String)
        check(post, String)
        if (isUsernameValid(username)) return true 
            else
                throw new Meteor.Error("401", "Username not exist")
}

/* TODO not need explain... */
function isUsernameValid(username: string):boolean {
    return true
    /*
    var query : Observable<UserExt[]>
    var querySub : Subscription

    if (querySub)
        querySub.unsubscribe()

    querySub = MeteorObservable.call('createUserProfil', Meteor.userId(), username)
    .subscribe(() => {
        MeteorObservable.autorun().subscribe(() => {
            query = UsersExt.find({ 'name': username })

            console.log('new query 1 -> ' + query)
            console.log('new query 2 -> ' + !!query)
            console.log('new query 3 -> ' + query.name)

            if (!!query.name) return true
                else {
                    MeteorObservable.call('createUserProfil', Meteor.userId(), username)
                    .subscribe()
                    console.log(username + ' is created')
                    return true
                }
        })
    })

    return true
    */
}

function editUserProfile(articleId: string, username: string):void {
    var title = giveTitle(articleId, 'en')
    var commentList = giveCommentList(Meteor.userId(), title)
    UsersExt.update({ 'idOwner': Meteor.userId() }, {
        $set: {
            comment: commentList
        }
    })
}

function giveCommentList(userid: string, newtitle: string):any[] {
    var userinfo = UsersExt.findOne({ 'idOwner': userid })
    console.log('userinfo -> ' + JSON.stringify(userinfo))
    console.log('giveComment will send : ' + !!userinfo)
    if (!!userinfo) var newList = new Set(userinfo.comment)
        else 
            throw new Meteor.Error('404', 'GiveComment -> Not Found')

    if (!newList.has(newtitle)) {
        console.log('newlist do not contain '+newtitle)
        newList.add(newtitle)
    }
    return Array.from(newList)
}

Meteor.methods({
    AddComment: function(articleid: string, username: string, post: string):void {

        if (!ctrlArgs(articleid, username, post))
            throw new Meteor.Error('404', 'Arguments problem')

        if (Meteor.isServer) {
            newComment(articleid, username, post)
            editUserProfile(articleid, username)
        }
    },

    DelComment: function(articleId: string, userName: string):void {
    }
})
