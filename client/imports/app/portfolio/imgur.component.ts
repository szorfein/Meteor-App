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

    images
    albums
    formular : string = 'portfolio'

    constructor(private imgurService : ImgurService) {}

    ngOnInit() {
        this.loadImages()
        this.loadAlbum()
    }

    loadImages() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getImages(setting).subscribe(images => this.images = images
        , err => console.log(err))
        })
    }

    loadAlbum() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getAlbum(setting).subscribe(albums => this.albums = albums 
        , err => console.log(err))
        })
    }
}
