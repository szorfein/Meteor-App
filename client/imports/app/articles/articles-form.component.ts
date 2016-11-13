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

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        console.log(this.user)
        this.addForm = this.formBuilder.group({
            writer: ['', Validators.required],
            title: ['', Validators.required],
            image: ['', Validators.required],
            body: ['', Validators.required],
            public: [false]
        })
    }

    addArticle(): void {

        if (!Meteor.userId()) {
            alert('Please log in to add article')
            return
        }

        if (this.addForm.valid) {
            Articles.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId() }))

            this.addForm.reset()
        }
    }
}
