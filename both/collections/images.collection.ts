import { MongoObservable } from 'meteor-rxjs'
import { Meteor } from 'meteor/meteor'
import { UploadFS } from 'meteor/jalik:ufs'
import { Image } from '/both/models/image.model'
import { isRoot } from '/lib/users'

export const Images = new MongoObservable.Collection<Image>('images')

export const ImagesStore = new UploadFS.store.GridFS({
    collection: Images.collection,
    name: 'images',
    filter: new UploadFS.Filter({
        contentTypes: ['image/*'],
        extensions: ['jpg', 'png'],
        minSize: 1,
        maxSize: 1024 * 1000 // 1MB
    }),
    permissions: new UploadFS.StorePermissions({
        insert: function(userId: string) {
            return isRoot(userId)
        },
        update: function(userId: string) {
            return isRoot(userId)
        },
        remove: function(userId: string) {
            return isRoot(userId)
        }
    })
})
