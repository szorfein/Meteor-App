import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import { retLang } from '/lib/lang'
import { isLang } from '/lib/validate'
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
    image : string = ''
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

    constructor( private formBuilder: FormBuilder ) {}

    ngOnInit() {
        this.printForm()
    }

    onImage(imageId : string) : void {
        this.image = imageId
        this.addForm.value.image = imageId
        this.kill()
        this.imageSub = MeteorObservable.subscribe('image', this.image).subscribe()
        console.log('addForm.image -> ' + this.addForm.value.image)
    }

    private printForm() : void {
        if (this.edit) {
            this.kill()
            this.image = this.edit.image
            this.imageSub = MeteorObservable.subscribe('image', this.image).subscribe()
            this.addForm = this.formBuilder.group({
                title: [this.edit.lang[retLang(this.lang)].title],
                description: [this.edit.lang[retLang(this.lang)].description],
                image: [this.image],
                lang: [this.lang],
                article: [this.edit.lang[retLang(this.lang)].article],
                isPublic: [this.edit.isPublic],
                toFooter: [this.edit.pastToFooter]
            })
        } else {
            this.addForm = this.formBuilder.group({
                title: ['', [Validators.required, Validators.minLength(2)] ],
                description: ['', Validators.required],
                image: [this.image],
                lang: [this.lang, Validators.required],
                article: ['', Validators.required],
                isPublic: [false],
                toFooter: [false]
            })
        }

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
            let img = this.addForm.value.image
            console.log('We will add img -> ' + img)

            if (this.edit) {
                console.log('we edit an article')
                MeteorObservable.call('updArticle', this.addForm.value, img, this.arrayOfTags, this.edit._id).subscribe(() => {
                    alert('Article has been update')
                }, (err) => {
                    alert(`Cannot update article cause ${err}`)
                })
            } else {
                console.log('we will create a new article')
                MeteorObservable.call('insArticle', this.addForm.value, img, this.arrayOfTags).subscribe(() => {
                    alert('Article has been created')
                }, (err) => {
                    alert(`Cannot insert article cause ${err}`)
                })
            }

            this.addForm.reset()
        } else { 
            console.log('addForm not valid...')
        }
    }

    langSelected(lang : string) {
        if (isLang(lang)) {
            this.lang = lang
        }
    }

    private kill() {
        if (this.tagsSub)
            this.tagsSub.unsubscribe()

        if (this.imageSub)
            this.imageSub.unsubscribe()
    }

    ngOnDestroy() {
        this.kill()
    }
}
