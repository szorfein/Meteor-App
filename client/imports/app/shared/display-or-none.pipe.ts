import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'displayOrNone'
})

export class DisplayOrNonePipe implements PipeTransform {
    transform(blabla: string) {
        if (blabla)
            return blabla

        return ''
    }
}
