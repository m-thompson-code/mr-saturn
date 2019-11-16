import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { VideoOverlayComponent } from './video_overlay/video_overlay.component';
import { ConfigComponent } from './config/config.component';

import { MrSaturnComponent } from './video_overlay/mr_saturn/mr_saturn.component';
import { MsgComponent } from './video_overlay/msg/msg.component';
import { MilkManComponent } from './video_overlay/milk_man/milk_man.component';
import { MonaLisaComponent } from './video_overlay/mona_lisa/mona_lisa.component';
import { OlivesComponent } from './video_overlay/olives/olives.component';
import { OliveComponent } from './video_overlay/olives/olive/olive.component';

import * as firebase from 'firebase/app';

import "firebase/firestore";

// Initialize Firebase
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

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,

    VideoOverlayComponent,
    ConfigComponent,

    MrSaturnComponent,
    MsgComponent,
    MilkManComponent,
    MonaLisaComponent,
    OlivesComponent,
    OliveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
