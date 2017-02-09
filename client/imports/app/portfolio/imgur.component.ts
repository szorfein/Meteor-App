import { Component, Output, OnInit } from '@angular/core'
import { ImgurService } from './imgur.service'
import { ImgurSetting } from '/both/models/portfolio.model'
import { MeteorObservable } from 'meteor-rxjs'
import template from './imgur.component.html'

@Component({
    selector : 'imgur',
    template
})

export class ImgurComponent implements OnInit {

    image

    constructor(private imgurService : ImgurService) {}

    ngOnInit() {
        this.loadImages()
    }

    loadImages() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getImages(setting).subscribe(images => this.image = images
        , err => console.log(err))
        })
    }
}
