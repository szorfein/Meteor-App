import { CaptchasIndex } from '/both/collections/captchas.collection'

// Meteor don't have findAndModify()
export function incrementIndex():number {
    CaptchasIndex.update({ _id: 'captchaId' }, {
        $inc: { seq: 1 }
    })

    let ret = CaptchasIndex.findOne({_id: 'captchaId'})
    let found : number = 0

    if (ret)
        found = ret.seq

    return found
}
