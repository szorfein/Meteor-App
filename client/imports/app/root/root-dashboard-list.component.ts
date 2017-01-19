import { Component, OnInit } from '@angular/core'
import { MeteorObservable } from 'meteor-rxjs'
import template from './root-dashboard-list.component.html'

@Component({
    selector: 'root-list',
    template
})

export class RootDashboardListComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        this.getip()
    }

    getip() {
        MeteorObservable.call('registerAnalytic').subscribe(() => {
            console.log('register')
        }, (err) => {
            console.log('cannot found ip')
        })
    }
}
