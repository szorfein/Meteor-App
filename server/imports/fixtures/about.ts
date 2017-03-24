import { AboutDetail, HomeDetail } from '/both/models/extra.model'
import { AboutsDetail, HomesDetail } from '/both/collections/extras.collection'
import { userLib } from '/lib/server/user'

export function loadAbout() {

    if (AboutsDetail.find().cursor.count() === 0) {
        const about : AboutDetail = {
            image: 'img/default_wall.jpg',
            idOwner: userLib.rootId(),
            name: 'admin',
            company: 'localhost',
            aboutCompany: [
                { 
                    lang: 'en',
                    yourCompany: "Nulla a metus tortor. Suspendisse elementum diam ac elit consequat, ac commodo neque tristique. Pellentesque pharetra dolor metus, et interdum dolor posuere sed. Fusce pretium, arcu quis scelerisque sollicitudin, leo augue suscipit turpis, sed ultricies orci tellus non dui. Pellentesque porta nulla quis gravida interdum. Nunc tempus, urna quis porta fringilla, leo sem fermentum enim, in aliquam augue lectus at massa. Aenean porta ante justo. Aenean dapibus, tortor a hendrerit mollis, turpis libero mattis arcu, id malesuada tortor dui in est. Aliquam condimentum ipsum nec quam eleifend interdum. Vestibulum accumsan dignissim elit, id fermentum tortor. Pellentesque laoreet efficitur mi, sed consequat libero accumsan et. Sed laoreet justo ex, vitae auctor libero euismod vel. Suspendisse in neque eget mauris aliquam pulvinar sagittis sed turpis. Suspendisse viverra a ipsum sit amet molestie."
                }
            ],
            jobName: [
                { 
                    lang: 'en',
                    yourjob: 'ninja full time',
                }
            ],
            skill: '',
            mail: '',
            telMobile: '',
            telFix: '',
            fax: '',
            aboutYourSelf: [
                { 
                    lang: 'en',
                    yourself: "facilisi. Donec id felis dignissim, facilisis diam id, scelerisque lorem. Integer ornare dolor a erat pharetra, nec faucibus ante ultricies. Cras mattis elit eget tempus fermentum. In ullamcorper ipsum felis, quis convallis massa volutpat ut. Nam ultricies justo eget dapibus consequat. Vivamus auctor ante sit amet sem aliquam, vitae rhoncus lacus placerat. Aliquam a vehicula libero, eu venenatis lorem. Mauris mattis justo tempor massa feugiat laoreet. Nulla ut laoreet ex. Sed rhoncus quis."
                }
            ],
            address: '',
            facebook: '',
            github: '',
            twitter: '',
            dotshare: '',
            imgur: '',
            reddit: '',
        }

        AboutsDetail.insert(about)
    }
}

export function loadHome() {

    if (HomesDetail.find().cursor.count() === 0) {
        const home = {
            banner: 'img/default_wall.jpg',
            welcome: [
                {
                    lang: 'en',
                    title: 'Szorfein', 
                    message: 'UX/UI Designer & Web developer'
                }
            ],
            idOwner: userLib.rootId()
        }
        HomesDetail.insert(home)
    }
}
