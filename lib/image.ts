// imgLink is url for image, (size) must be t , m , l , h
export function rebuildUrlWithSize(imgLink : string, size : string) {
    const old = imgLink
    const splitLink = old.split(/\//)
    const splitImg = splitLink[3].split(/\./)
    const newUrl = splitLink[0]+'//'+splitLink[2]+'/'+splitImg[0]+size+'.'+splitImg[1]
    return newUrl
}
