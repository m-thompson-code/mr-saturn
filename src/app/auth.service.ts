import { Injectable } from '@angular/core';
import firebase from 'firebase/app';


@Injectable()
export class AuthService {
    // user is set on app.component
    user: firebase.User;

    constructor() {

    }
}