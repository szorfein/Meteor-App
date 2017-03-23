import { Component, Input, OnInit } from '@angular/core'
import { rebuildUrlWithSize } from '/lib/image'
import template from './display-imgur.component.html'

enum Display {
    image , album , gallery
}

@Component({
    selector: 'display-imgur',
    template
})

export class DisplayImgurComponent implements OnInit {
    @Input() imgur
    @Input() display : string
    image : boolean = false
    album : boolean = false
    gallery : boolean = false
    width : number
    imgSize : string = 'm'

    /*
     * DOC: https://developer.mozilla.org/en-US/docs/Web/API/Window
     * for retrieve window size :
     * width : window.screen.width
     * height : window.screen.height
     *
     */
    constructor() {  
        this.width = window.innerWidth
    }

    ngOnInit() {
        this.ctrlArg()
    }

    private ctrlArg() {
        if (this.display == Display[0])
            this.image = true

        if (this.display == Display[1])
            this.album = true

        if (this.display == Display[2])
            this.gallery = true
    }

    /*
     * ngFor : first item
     * tips: https://stackoverflow.com/questions/33770823/angular2-how-to-set-element-class-name-when-using-ng-for-only-on-first-element
     *
     */
    buildLink(img : string) {
        if (this.imgur && img) {
            this.setWidth()
            return rebuildUrlWithSize(img, this.imgSize)
        }
    }

    private setWidth() {
        if (this.width >= 993)
            this.imgSize = 'h'
        else
            this.imgSize = 'l'
    }

    onResize(event) {
        this.width = event.target.innerWidth
        this.setWidth()
    }
}
