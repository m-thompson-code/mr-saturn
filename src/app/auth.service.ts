import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
    // user is set on app.component
    user: firebase.User;

    constructor() {

    }
}