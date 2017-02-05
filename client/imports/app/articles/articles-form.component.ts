import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { InjectUser } from 'angular2-meteor-accounts-ui'
import { Meteor } from 'meteor/meteor'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import { Tags } from '/both/collections/tags.collection'
import { Tag } from '/both/models/tag.model'
import template from './articles-form.component.html'

@Component({
    selector: 'articles-form',
    template
})

@InjectUser('user')
export class ArticlesFormComponent implements OnInit, OnDestroy {
    addForm : FormGroup
    user : Meteor.User
    tags : Observable<Tag[]>
    tagsSub : Subscription
    myTag = new Set()
    arrayOfTags : string[] = []
    image: string = ''
    imageSub : Subscription

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

        if (!!Meteor.user()) {
            MeteorObservable.autorun().subscribe(() => {
                this.printForm()
            })
        }
    }

    onImage(imageId : string) : void {
        this.image = imageId
    }

    printForm():void {
        this.addForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2)] ],
            description: ['', Validators.required],
            lang: ['en', Validators.required],
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

    addArticle() {
        if (this.addForm.valid) {
            this.arrayOfTags = Array.from(this.myTag)

            MeteorObservable.call('insArticle', this.addForm.value, this.image, this.arrayOfTags).subscribe(() => {
                alert('Article has been created')
            }, (err) => {
                alert(`Cannot insert article cause ${err}`)
            })

            this.addForm.reset()
        }
    }

    ngOnDestroy() {
        if (this.tagsSub)
            this.tagsSub.unsubscribe()
        
        this.imageSub.unsubscribe()
    }
}
