import { Component, Input } from '@angular/core' 
import { AboutDetail } from '/both/models/extra.model'
import template from './about-blog.component.html'

@Component({
    selector: 'about-blog',
    template
})

export class AboutBlogComponent {
    @Input() about : AboutDetail
    formular : string = 'about'
    constructor() {}
}
