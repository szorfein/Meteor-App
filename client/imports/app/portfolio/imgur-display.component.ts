import { Component, Input, OnInit } from '@angular/core'
import { ImgurService } from './imgur.service'
import { ImgurSetting } from '/both/models/portfolio.model'
import { MeteorObservable } from 'meteor-rxjs'
import template from './imgur-display.component.html'

@Component({
    selector : 'imgur-display',
    template
})

export class ImgurDisplayComponent implements OnInit {
    @Input() imgur
    image
    album

    constructor(private imgurService : ImgurService) {}

    ngOnInit() {
        if (this.imgur && this.imgur.album) {
            this.loadAlbum()
        }

        if (this.imgur && !this.imgur.album) {
            this.loadImage()
        }
    }

    loadAlbum() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getAlbum(setting, this.imgur).subscribe(alb => this.album = alb
                                                           ,err => console.log(err))
        })
    }

    loadImage() {
        MeteorObservable.call('imgurConfig').subscribe((setting: ImgurSetting) => {
            this.imgurService.getImages(setting, this.imgur).subscribe(img => this.image = img 
                                                           ,err => console.log(err))
        })
    }
}
