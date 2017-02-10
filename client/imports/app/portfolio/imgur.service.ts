import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ImgurSetting } from '/both/models/portfolio.model'

@Injectable()
export class ImgurService {

    private imgurUrl = 'https://api.imgur.com/3/album/Zbe98/images'

    constructor(private http : Http) {}

    getImages(setting : ImgurSetting) {
        let options = this.buildRequestOptions(setting)

        return this.http.get(this.imgurUrl, options)
        .map(this.extractData)
        .catch((err: any) => Observable.throw(err.json() || 'Server Error'))
    }

    getAlbum(setting : ImgurSetting) {
        let options = this.buildRequestOptions(setting)

        return this.http.get(this.imgurUrl, options)
        .map(this.extractData)
        .catch((err: any) => Observable.throw(err.json() || 'Server Error'))
    }

    extractData(res) {
        let body = res.json()
        return body.data || {}
    }

    private buildRequestOptions(setting : ImgurSetting) {
        if (setting) {
            let headers = new Headers({
                Authorization: 'Client-ID ' + setting.clientId,
                Accept: 'application/json'
            })
            return new RequestOptions({ headers: headers })
        }
    }
}
