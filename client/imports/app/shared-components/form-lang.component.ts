import { Component, Output, EventEmitter } from '@angular/core'
import template from './form-lang.component.html'

@Component({ 
    selector: 'form-lang',
    template
})

export class FormLangComponent {
    @Output() langSelect : EventEmitter<string> = new EventEmitter<string>()
    lang : string = 'en'

    langSelected(lang : string) {
        if (/^(en|fr)$/i.test(lang)) {
            this.lang = lang
            this.langSelect.emit(lang)
        }
    }
}
