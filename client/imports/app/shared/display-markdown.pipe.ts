import { Pipe, PipeTransform } from '@angular/core'
import MarkdownIt = require('markdown-it')

@Pipe({
    name: 'markdown'
})

export class DisplayMarkdownPipe implements PipeTransform {
    transform(text : string) {

        if (!text)
            return

        const md = new MarkdownIt()

        return md.render(text)
    }
}
