import { Pipe, PipeTransform } from '@angular/core'
import { Meteor } from 'meteor/meteor'

@Pipe({
    name: 'displayAbout'
})

export class DisplayAboutPipe implements PipeTransform {
    transform(about: string) {
        if (about)
            return about
        else 
            return ''
    }
}
