import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'

import { Articles } from '/both/collections/articles.collection'

import template from './articles-form.component.html'

@Component({
    selector: 'articles-form',
    template
})

@InjectUser('user')
export class ArticlesFormComponent implements OnInit {
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

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        console.log('User: ' + this.user)
        this.addForm = this.formBuilder.group({
            title: ['', Validators.required],
            image: ['', Validators.required],
            description: ['', Validators.required],
            lang: ['en'],
            article: ['', Validators.required],
            isPublic: [false]
        })
    }

    addArticle(): void {

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
                owner: Meteor.userId(), 
                image: this.addForm.value.image,
                bloc: this.blocTmp,
                isPublic: this.addForm.value.isPublic
            })

            this.addForm.reset()
        }
    }
}
