import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ImgurSetting, ImgurLink } from '/both/models/portfolio.model'

@Injectable()
export class ImgurService {

    private setting : ImgurSetting

    constructor(private http : Http) {}

    getImages(setting : ImgurSetting, imgur : ImgurLink) {
        if (imgur && imgur.idImgur) {
            console.log('getImages call with -> ' + imgur.idImgur)
            this.setting = setting
            let imgurUrl = 'https://api.imgur.com/3/image/'+imgur.idImgur
            let options = this.buildRequestOptions()

            return this.http.get(imgurUrl, options)
            .map(this.extractData)
            .catch((err: any) => Observable.throw(err.json() || 'Server Error'))
        }
    }

    getAlbum(setting : ImgurSetting, imgur : ImgurLink) {
        if (imgur && imgur.idImgur) {
            console.log('getAlbum call with -> ' + imgur.idImgur)
            this.setting = setting
            let imgurUrl = 'https://api.imgur.com/3/album/'+imgur.idImgur+'/images'
            let options = this.buildRequestOptions()

            return this.http.get(imgurUrl, options)
            .map(this.extractData)
            .catch((err: any) => Observable.throw(err.json() || 'Server Error'))
        }
    }

    extractData(res) {
        let body = res.json()
        return body.data || {}
    }

    private buildRequestOptions() {
        if (this.setting) {
            let headers = new Headers({
                Authorization: 'Client-ID ' + this.setting.clientId,
                Accept: 'application/json'
            })
            return new RequestOptions({ headers: headers })
        }
    }
}
