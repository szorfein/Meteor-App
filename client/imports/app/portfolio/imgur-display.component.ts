import { Component, Input, OnInit } from '@angular/core'
import { ImgurService } from './imgur.service'
import { ImgurSetting } from '/both/models/portfolio.model'
import { MeteorObservable } from 'meteor-rxjs'
import { isGallery, isAlbum, isImage } from '/lib/validate'
import template from './imgur-display.component.html'

@Component({
    selector : 'imgur-display',
    template
})

export class ImgurDisplayComponent implements OnInit {
    @Input() imgur
    image
    album
    gallery
    display : string = ''

    constructor(private imgurService : ImgurService) {}

    ngOnInit() {
        if (this.imgur && isAlbum(this.imgur.link))
            this.loadAlbum()

        if (this.imgur && isImage(this.imgur.link))
            this.loadImage()

        if (this.imgur && isGallery(this.imgur.link))
            this.loadGallery()
    }

    loadAlbum() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getAlbum(setting, this.imgur).subscribe((alb) => {
                this.album = alb
                this.display = 'album'
            }, (err) => console.log(err))
        })
    }

    loadImage() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getImages(setting, this.imgur).subscribe((img) => {
                this.image = img 
                this.display = 'image'
            }, (err) => { console.log(err) })
        })
    }

    loadGallery() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getGallery(setting, this.imgur).subscribe((gallery) => {
                this.gallery = gallery
                this.display = 'gallery'
            }, (err) => { console.log(err) })
        })
    }
}
