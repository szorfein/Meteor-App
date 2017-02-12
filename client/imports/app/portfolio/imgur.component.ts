import { Component, Output, OnInit, OnDestroy } from '@angular/core'
import { ImgurService } from './imgur.service'
import { Subscription, Observable } from 'rxjs'
import { ImgurSetting } from '/both/models/portfolio.model'
import { ImgurLinks } from '/both/collections/portfolios.collection'
import { MeteorObservable } from 'meteor-rxjs'
import template from './imgur.component.html'

@Component({
    selector : 'imgur',
    template
})

export class ImgurComponent implements OnInit, OnDestroy {

    image1
    image2
    image3
    portfolioSub : Subscription
    portfolio
    formular : string = 'portfolio'

    constructor(private imgurService : ImgurService) {}

    ngOnInit() {
        this.loadImages()
    }

    loadImages() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.portfolioSub = MeteorObservable.subscribe('imgurLatest').subscribe(() => {
                this.portfolio = ImgurLinks.find({},{skip:0,limit:3,sort:{'submitAt':-1}})
                if (this.portfolio) {
                    for (let i=0;i<this.portfolio.length;i++) {
                        console.log('we have found '+i)
                    }

                    this.imgurService.getImages(setting).subscribe(images => this.image1 = images
        , err => console.log(err))
    this.imgurService.getImages(setting).subscribe(images => this.image2 = images
        , err => console.log(err))
    this.imgurService.getImages(setting).subscribe(images => this.image3 = images
        , err => console.log(err))
                }
            })
        })
    }

    ngOnDestroy() {
        this.portfolioSub.unsubscribe()
    }
}
