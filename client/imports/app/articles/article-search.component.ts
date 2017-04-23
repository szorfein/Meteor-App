import { Component, Output, OnInit, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import template from './article-search.component.html'

@Component({
    selector: 'article-search',
    template
})

export class ArticleSearchComponent implements OnInit {
    @Output() search : EventEmitter<string> = new EventEmitter<string>()
    searchForm : FormGroup

    constructor( private formBuilder : FormBuilder ) {}

    ngOnInit() {
        this.printForm()
    }

    private printForm() {
        this.searchForm = this.formBuilder.group({
            sff: ['']
        })
    }

    searchValid() {
        if (this.searchForm.valid) {
            console.log('searchForm is valid value : '+this.searchForm.value.sff)
            this.search.emit(this.searchForm.value.sff)
            this.searchForm.reset()
        }
    }
}
