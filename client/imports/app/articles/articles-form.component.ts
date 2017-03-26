import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import { retLang } from '/lib/lang'
import template from './articles-form.component.html'

@Component({
    selector: 'articles-form',
    template
})

export class ArticlesFormComponent implements OnInit, OnDestroy {
    @Input() edit
    addForm : FormGroup
    tags : Observable<Tag[]>
    tagsSub : Subscription
    myTag = new Set()
    arrayOfTags : string[] = []
    image: string = ''
    imageSub : Subscription
    lang : string = 'en'

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
        this.imageSub = MeteorObservable.subscribe('images').subscribe()
        this.printForm()
    }

    onImage(imageId : string) : void {
        this.image = imageId
    }

    printForm():void {
        if (this.edit) {
            this.image = this.edit.image
            this.addForm = this.formBuilder.group({
                title: [this.edit.lang[retLang(this.lang)].title, [Validators.required, Validators.minLength(2)] ],
                description: [this.edit.lang[retLang(this.lang)].description, Validators.required],
                lang: [this.lang, Validators.required],
                article: [this.edit.lang[retLang(this.lang)].article, Validators.required],
                isPublic: [this.edit.isPublic],
                toFooter: [this.edit.pastToFooter]
            })
        } else {
            this.addForm = this.formBuilder.group({
                title: ['', [Validators.required, Validators.minLength(2)] ],
                description: ['', Validators.required],
                lang: [this.lang, Validators.required],
                article: ['', Validators.required],
                isPublic: [false],
                toFooter: [false]
            })
        }

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

    addArticle() {
        if (this.addForm.valid) {
            this.arrayOfTags = Array.from(this.myTag)
            this.addForm.value.lang = this.lang

            if (this.edit) {
                MeteorObservable.call('updArticle', this.addForm.value, this.image, this.arrayOfTags, this.edit._id).subscribe(() => {
                    alert('Article has been update')
                }, (err) => {
                    alert(`Cannot update article cause ${err}`)
                })
            } else {
                MeteorObservable.call('insArticle', this.addForm.value, this.image, this.arrayOfTags).subscribe(() => {
                    alert('Article has been created')
                }, (err) => {
                    alert(`Cannot insert article cause ${err}`)
                })
            }

            this.addForm.reset()
        }
    }

    langSelected(lang : string) {
        if (/^(en|fr)$/i.test(lang)) {
            this.lang = lang
        }
    }

    ngOnDestroy() {
        if (this.tagsSub)
            this.tagsSub.unsubscribe()
        
        this.imageSub.unsubscribe()
    }
}
