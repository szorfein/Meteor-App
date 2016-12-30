import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import { Meteor } from 'meteor/meteor'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'

import { Articles } from '/both/collections/articles.collection'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import { UserExt } from '/both/models/userext.model'
import { UsersExt } from '/both/collections/usersext.collection'

import MarkdownIt = require('markdown-it')

import template from './articles-form.component.html'
import style from './articles-form.component.scss'

@Component({
    selector: 'articles-form',
    template,
    styles: [style]
})

@InjectUser('user')
export class ArticlesFormComponent implements OnInit, OnDestroy {
    addForm : FormGroup
    user : Meteor.User

    root : Observable<UserExt>
    rootsub : Subscription

    blocTmp: [{ 
        title: string, 
        lastEdit: Date,
        lastEditOwner: string,
        description: string,
        lang: string, 
        article: string
    }]

    tags : Observable<Tag[]>
    tagsSub : Subscription
    myTag = new Set()
    arrayOfTags : string[] = []
    image: string = ''
    imageSub : Subscription
    md = new MarkdownIt()

    // TODO: Add test if tagValue exist in collection !
    addTag(tagValue: string): void {

        if (this.myTag.has(tagValue)) {
            this.myTag.delete(tagValue)
        } else {
            this.myTag.add(tagValue)
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private zone: NgZone
    ) {}

    ngOnInit() {
        
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        if (this.rootsub)
            this.rootsub.unsubscribe()

        if (!!Meteor.user()) {
            this.rootsub = MeteorObservable.subscribe('root').subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    this.callRoot()
                    this.printForm()
                }, (error) => {
                    if (error) {
                        this.zone.run(() => {
                        })
                    }
                })
            })
        }
    }

    markdownDisplay(text: string):string {
        if(text)
            return this.md.render(text)
    }

    callRoot() {
        this.root = UsersExt.findOne({ 'idOwner': Meteor.userId() })
    }

    onImage(imageId : string) : void {
        this.image = imageId
        console.log('Last image register -> ' + this.image)
    }

    printForm():void {
        this.addForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2)] ],
            description: ['', Validators.required],
            lang: ['en'],
            article: ['', Validators.required],
            isPublic: [false]
        })
        if (this.tagsSub)
            this.tagsSub.unsubscribe()

        this.tagsSub = MeteorObservable.subscribe('tags').subscribe(() => {
            this.tags = Tags.find({}).zone()
        })
    }

    onReset() {
            this.myTag.clear()
            this.arrayOfTags = []
    }

    addArticle(): void {
        this.arrayOfTags = Array.from(this.myTag)

        if (!Meteor.userId()) {
            alert('Please log in to add article')
            return
        }

        if (this.addForm.valid) {
            this.blocTmp = [ { 
                title: this.addForm.value.title, 
                lastEdit: new Date(),
                lastEditOwner: Meteor.userId(),
                description: this.addForm.value.description,
                lang: this.addForm.value.lang,
                article: this.addForm.value.article
            } ]

            Articles.insert({
                createdAt: new Date(),
                author: this.user.username,
                authorId: Meteor.userId(), 
                image: this.image,
                bloc: this.blocTmp,
                isPublic: this.addForm.value.isPublic,
                tags: this.arrayOfTags
            })
        
            //this.tags 
            this.addForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.tagsSub)
            this.tagsSub.unsubscribe()
        
        if (this.rootsub)
            this.rootsub.unsubscribe()

        this.imageSub.unsubscribe()
    }
}
