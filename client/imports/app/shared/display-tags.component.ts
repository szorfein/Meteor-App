import { Component, Input, OnInit } from '@angular/core'
import template from './display-tags.component.html'

enum Display {
    bloc , inline
}

@Component({
    selector: 'display-tags',
    template
})

export class DisplayTagsComponent implements OnInit {
    @Input() tag : Array<string>
    @Input() display : string
    displayBloc : boolean = false
    displayInline : boolean = false

    ngOnInit() {
        this.setDisplay()
    }

    private setDisplay() {
        if (this.testDisplay()) {
            if (this.display == Display[0]) {
                this.displayBloc = true
            } else if (this.display == Display[1]) {
                this.displayInline = true
            }
        }
    }

    private testDisplay() {
        return this.display == Display[0]
            || this.display == Display[1]
    }
}
