import { Component, NgZone, OnInit, OnDestroy } from '@angular/core'
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
    root
    rootsub : Subscription
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

    callRoot() {
        MeteorObservable.call('userAdmin').subscribe((root) => {
            this.root = root
        })
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
        
        if (this.rootsub)
            this.rootsub.unsubscribe()

        this.imageSub.unsubscribe()
    }
}
