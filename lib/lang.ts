import { Lang } from '/both/enums/lang.enum'

export function retLang(l : string) {
    let i : number = 0
    if (l == Lang[0])
        i = 0
    if (l == Lang[1])
        i = 1

    return i
}
