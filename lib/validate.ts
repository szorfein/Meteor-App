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

export function basicString(v : FormControl) {
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

export function tag(tagName : string) {
    return /^[a-z]{3,16}$/i.test(tagName)
}

export function isMeteorId(name : string) {
    return /^[a-z0-9]{17}$/i.test(name)
}

export function domain(v : FormControl) {
    if (testOrNone(/^([a-z]{2,15}.)?([a-z]{2,15}.)+(com|eu|org|fr|it)$/i, v.value)) {
        return null
    }
    return v.status = 'Invalid domain'
}

export function agent(v : string) {
    let r : string
    r = agentMobile.any(v)
    r = r ? r : agentDesktop.any(v)
    return r ? r : 'Other'
}

let agentMobile = {
    Android: function(v : string) {
        return /Android/i.test(v)
    },
    BlackBerry: function(v : string) {
        return /BlackBerry/i.test(v)
    },
    iOS: function(v : string) {
        return /iPhone|iPad|iPod/i.test(v)
    },
    Opera: function(v : string) {
        return /Opera Mini/i.test(v)
    },
    Windows: function(v : string) {
        return /IEMobile/i.test(v)
    },
    any: function(v : string) {
        if (agentMobile.Android(v))
            return 'Android'
        else if (agentMobile.BlackBerry(v))
            return 'BlackBerry'
        else if (agentMobile.iOS(v))
            return 'iOS'
        else if (agentMobile.Opera(v))
            return 'Opera Mini'
        else if (agentMobile.Windows(v))
            return 'IEMobile'
    }
}

// Internet Explorer info: https://msdn.microsoft.com/library/ms537503.aspx
let agentDesktop = {
    Firefox: function(v : string) {
        return /Firefox/i.test(v)
    },
    Vivaldi: function(v : string) {
        return /Vivaldi/i.test(v)
    },
    Safari: function(v : string) {
        return /Safari/i.test(v)
    },
    Opera: function(v : string) {
        return /Opera/i.test(v)
    },
    Trident: function(v : string) {
        return /Trident\/7.0/i.test(v)
    },
    IETen: function(v : string) {
        return /Trident\/6.0/i.test(v)

    },
    IENine: function(v : string) {
        return /Trident\/5.0/i.test(v)
    },
    any: function(v : string) {
        if (agentDesktop.Firefox(v))
            return 'Firefox'
        else if (agentDesktop.Vivaldi(v))
            return 'Vivaldi'
        else if (agentDesktop.Safari(v))
            return 'Safari'
        else if (agentDesktop.Opera(v))
            return 'Opera'
        else if (agentDesktop.Trident(v))
            return 'IE 11'
        else if (agentDesktop.IETen(v))
            return 'IE 10'
        else if (agentDesktop.IENine(v))
            return 'IE 9'
    }
}
