import { Component, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'mr-saturn';

    unsub: firebase.Unsubscribe;

    handledAuth: boolean = false;

    constructor(private ngZone: NgZone, private authService: AuthService) {
        (window as any).dark = () => {
            if (localStorage.getItem('dark')) {
                localStorage.setItem('dark', 'true');
            } else {
                localStorage.setItem('dark', '');
            }
        }

        this.authHandler();
    }

    authHandler() {
        this.unsub && this.unsub();
        this.handledAuth = false;

        this.unsub = firebase.auth().onAuthStateChanged(user => {
            this.ngZone.run(() => {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    var providerData = user.providerData;
                    // ...
                } else {
                    // User is signed out.
                    // ...
                }
    
                console.log(user);
                this.handledAuth = true;

                this.authService.user = user;
            });
        });
    }

    ngOnDestroy() {
        this.unsub && this.unsub();
    }
}
