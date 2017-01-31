import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { MeteorObservable } from 'meteor-rxjs'
import template from './stat-article.component.html'

@Component({
    selector: 'stat-user',
    template
})

export class StatArticleComponent {

    // here all web browser (chrome,ie,firefox,...)
    public pieChartLabels:string[] = ['chrome','ie','firefox']
    public pieChartType:string = 'pie';
    public pieChartData:number[] = [
        300, 400, 200
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
