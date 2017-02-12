import { FormControl } from '@angular/forms'

export function ctrlImgurLink(v : FormControl) {
    if (/https:\/\/imgur.com\/a\/([\w]{5})|https:\/\/i.imgur.com\/([\w]{7}).(png|jpeg)/i.test(v.value)) {
        return null
    }

    return v.status = 'INVALID'
}
