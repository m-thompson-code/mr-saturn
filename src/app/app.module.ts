import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VideoOverlayComponent } from './video_overlay/video_overlay.component';
import { ConfigComponent } from './config/config.component';

import { MrSaturnComponent } from './video_overlay/mr_saturn/mr_saturn.component';
import { MilkManComponent } from './video_overlay/milk_man/milk_man.component';

import * as firebase from 'firebase/app';

import "firebase/firestore";

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDkY3b-5WGgLcEPK7s9L65if7-svTW2was",
  authDomain: "mr-saturn.firebaseapp.com",
  databaseURL: "https://mr-saturn.firebaseio.com",
  projectId: "mr-saturn",
  storageBucket: "mr-saturn.appspot.com",
  messagingSenderId: "847893261051",
  appId: "1:847893261051:web:8b5d67c34a840976cc5e5e",
  measurementId: "G-282RBMWF9D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,

    VideoOverlayComponent,
    ConfigComponent,

    MrSaturnComponent,
    MilkManComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
