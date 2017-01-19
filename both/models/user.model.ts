import { Meteor } from 'meteor/meteor'

export interface User extends Meteor.User {}

export interface RegisterUser {
    email: string;
    password: string;
    username: string;
    captcha: string;
}

export interface UserBar {
    username: string;
}
