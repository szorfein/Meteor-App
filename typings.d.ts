/// <reference types="zone.js" />
/// <reference types="meteor-typings" />
/// <reference types="@types/underscore" />
/// <reference types="@types/node" />

declare module "*.html" {
    const template: string
    export default template
}

declare module "*.scss" {
    const style: string
    export default style
}

declare module "*.sass" {
    const style: string
    export default style
}

declare module "*.css" {
    const style: string
    export default style
}

declare module 'meteor/accounts-base' {
    module Accounts {
        function requestPhoneVerification(phoneNumber: string, callback?: Function): void
        function verifyPhone(phoneNumber: string, code: string, callback?: Function): void
    }
}
