import { Component, EventEmitter, Output } from '@angular/core'
import { upload } from '/both/methods/images.methods'
import template from './upload-image.component.html'

@Component({
    selector: 'upload-image',
    template
})

export class UploadImageComponent {
    fileIsOver : boolean = false
    uploading : boolean = false
    actualFile : string = ''
    @Output() onFile: EventEmitter<string> = new EventEmitter<string>()

    constructor() {}

    fileOver(fileIsOver : boolean) : void {
        this.fileIsOver = fileIsOver
    }

    onFileDrop(file : File) : void {
        this.uploading = true

        upload(file)
        .then((result) => {
            this.addFile(result)
        })
        .catch((error) => {
            this.uploading = false
            console.log(`Upload has fail...`, error)
        })
    }

    addFile(file) {
        if (file) {
            this.actualFile = file._id
            this.onFile.emit(file._id)
        }
    }

    oniClick(e) {
        let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        this.onFileDrop(file)
    }
}
