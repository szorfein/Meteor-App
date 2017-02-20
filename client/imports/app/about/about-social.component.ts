import { Component, Input, OnInit } from '@angular/core'
import { AboutDetail } from '/both/models/extra.model'
import template from './about-social.component.html'

enum Display {
    bloc , inline
}

@Component({
    selector: 'social',
    template
})

export class AboutSocialComponent implements OnInit {
    @Input() social : AboutDetail
    @Input() display : string
    bloc : boolean = false 
    inline : boolean = false

    constructor() {}

    ngOnInit() {
        this.setDisplay()
    }

    private setDisplay() {
        console.log('social component call with ' + this.display)
        if (this.display == Display[0])
            this.bloc = true
        else if (this.display == Display[1])
            this.inline = true
    }
}
