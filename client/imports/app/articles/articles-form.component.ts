import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'

import { Meteor } from 'meteor/meteor'
import { Subscription } from 'rxjs/Subscription'
import { MeteorObservable } from 'meteor-rxjs'
import { Observable } from 'rxjs/Observable'

import { Articles } from '/both/collections/articles.collection'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'

import template from './articles-form.component.html'

@Component({
    selector: 'articles-form',
    template
})

@InjectUser('user')
export class ArticlesFormComponent implements OnInit, OnDestroy {
    addForm: FormGroup
    user: Meteor.User

    blocTmp: [{ 
        title: string, 
        lastEdit: Date,
        lastEditOwner: string,
        description: string,
        lang: string, 
        article: string
    }]

    tags: Observable<Tag[]>
    tagsSub: Subscription
    myTag = new Set()

    // TODO: Add test if tagValue exist in collection !
    addTag(tagValue: string): void {

        if (this.myTag.has(tagValue)) {
            this.myTag.delete(tagValue)
        } else {
            this.myTag.add(tagValue)
        }
    }

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2)] ],
            image: ['', Validators.required],
            description: ['', Validators.required],
            lang: ['en'],
            article: ['', Validators.required],
            isPublic: [false]
        })

        this.tags = Tags.find({}).zone()
        this.tagsSub = MeteorObservable.subscribe('tags').subscribe()
    }

    addArticle(): void {

        var arrayOfTags = Array.from(this.myTag)

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
                image: this.addForm.value.image,
                bloc: this.blocTmp,
                isPublic: this.addForm.value.isPublic,
                tags: arrayOfTags
            })

            //var idArticle = Articles.findOne({ 'bloc.title' : this.addForm.value.title })
            this.addForm.reset()
        }
    }

    ngOnDestroy() {
        this.tagsSub.unsubscribe()
    }
}
