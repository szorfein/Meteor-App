import { FormControl } from '@angular/forms'

function testOrNone(regex : RegExp, v : string) {
    return regex.test(v) || v == ''
}

export function imgurLink(v : FormControl) {
    if (/^https:\/\/imgur.com\/a\/([\w]{5})$|^https:\/\/i.imgur.com\/([\w]{7})[.]{1}(png|jpeg)$/i.test(v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function facebook(v : FormControl) {
    if (testOrNone(/^https:[\/]{2}[w]{3}.facebook.com\/[\w]{3,10}\/$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function git(v : FormControl) {
    if (testOrNone(/^https:[\/]{2}github.com\/[\w]{3,10}$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function twitter(v : FormControl) {
    if (testOrNone(/^https:[\/]{2}twitter.com\/[\w]{3,10}$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function dotshare(v : FormControl) {
    if (testOrNone(/^http:[\/]{2}dotshare.it\/[~]{1}[\w]{3,10}\/$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function imgur(v : FormControl) {
    if (testOrNone(/^https:[\/]{2}[\w]{3,10].imgur.com\/$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function reddit(v : FormControl) {
    if (testOrNone(/^https:[\/]{2}reddit.com\/user\/[\w]{3,10}$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function name(v : FormControl) {
    if (/^([\w\s.]{2,15})+$/i.test(v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function lang(v : FormControl) {
    if (/^[\w]{2}$/i.test(v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function forceMail(v : FormControl) {
    if (/^([\w]{1,20})[@]{1}[\w]{2,10}[.]{1}(com|eu)$/i.test(v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function mail(v : FormControl) {
    if (testOrNone(/^([\w]{1,20})[@]{1}[\w]{2,10}[.]{1}(com|eu)$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function asicString(v : FormControl) {
    if (testOrNone(/^[\w]{2,20}$/i, v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function company(v : FormControl) {
    if (/^[\w]{3,20}$/i.test(v.value)) {
        return null
    }
    return v.status = 'INVALID'
}

export function passwd(v : FormControl) {
    let res : number = 0

    if (/[a-z]+/.test(v.value)) {
        console.log('minus res has +1')
        res += 1
    }

    if (/[A-Z]+/.test(v.value)) {
        res += 1
        console.log('maj res has +1')
    }

    if (/\d+/i.test(v.value)) {
        res += 1
        console.log('decimal res has +1')
    }

    if (/[@-_*+$&]/.test(v.value)) {
        res += 1
        console.log('Strong cc res has +1')
    }

    if (/.{8,}/i.test(v.value)) {
        res += 1
        console.log('strenght res has +1')
    }

    if (res >= 5) {
        console.log('res is GOOD')
        return null
    }

    console.log('bad pass :-() ' + res)
    return v.status = 'INVALID'
}
