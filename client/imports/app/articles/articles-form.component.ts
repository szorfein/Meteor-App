import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { Articles } from '/both/collections/articles.collection'

import template from './articles-form.component.html'

@Component({
    selector: 'articles-form',
    template
})

export class ArticlesFormComponent implements OnInit {
    addForm: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ){}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            writer: ['', Validators.required],
            title: ['', Validators.required],
            image: ['', Validators.required],
            body: ['', Validators.required]
        })
    }

    addArticle(): void {
        if (this.addForm.valid) {
            Articles.insert(this.addForm.value)

            this.addForm.reset()
        }
    }
}
