import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { AuthService } from '../auth.service';

export interface FormSettings {
    font: 'random' | 'normal' | 'boing' | 'lumine hall';
    allowMsgsFromChat: boolean;
    allowMilkman: boolean;
    allowMonaLisa: boolean;
    allowOlives: boolean;
    allowRandomSprites: boolean;
    loopRandomSprites: boolean;
    
    additionalSaturns: number;
    loopCount: number;
    saturnsLimit: number;
}

type FontOption = 'Random' | 'Normal' | 'Mr. Saturn Boing' | 'Lumine Hall';

@Component({
    selector: 'moo-config',
    templateUrl: './config.template.html',
    styleUrls: ['./config.style.scss']
})
export class ConfigComponent implements OnInit {
    settings: FormSettings;

    // volumeStepperValue: number;

    fontOptions: FontOption[] = ['Random', 'Normal', 'Mr. Saturn Boing', 'Lumine Hall'];
    fontOption: FontOption;

    // motivationMinutesInputValue: string;
    // motivationDurationInputValue: string;
    additionalSaturnsValue: string;
    loopCountInputValue: string;
    saturnsLimitInputValue: string;

    saving: boolean = false;

    email: string;
    password: string;

    constructor(public router: Router, private _snackBar: MatSnackBar, public authService: AuthService) {
        this.router = router;
    }

    ngOnInit() {
        firebase.firestore().collection("saturns").doc('settings').get().then(docSnapshot => {
            const doc = (docSnapshot.data() || {}) as FormSettings;

            this.settings = {
                font: doc.font || 'normal',
                allowMsgsFromChat: doc.allowMsgsFromChat || false,
                allowMilkman: doc.allowMilkman || false,
                allowMonaLisa: doc.allowMonaLisa || false,
                allowOlives: doc.allowOlives || false,
                allowRandomSprites: doc.allowRandomSprites || false,
                loopRandomSprites: doc.loopRandomSprites || false,
                additionalSaturns: doc.additionalSaturns || 0,
                loopCount: doc.loopCount || 0,
                saturnsLimit: doc.saturnsLimit || 0,
            }

            if (this.settings.font === 'random') {
                this.fontOption = 'Random';
            } else if (this.settings.font === 'normal') {
                this.fontOption = 'Normal';
            } else if (this.settings.font === 'boing') {
                this.fontOption = 'Mr. Saturn Boing';
            } else if (this.settings.font === 'lumine hall') {
                this.fontOption = 'Lumine Hall';
            }

            // this.volumeStepperValue = (this.settings.volume || 0) * 10;

            this.loopCountInputValue = "" + (this.settings.loopCount || 0);
            this.saturnsLimitInputValue = "" + (this.settings.saturnsLimit || 0);
        });
    }

    public setEmail(event: any) {
        console.log(event.target.value);
        this.email = "" + event.target.value;
    }

    public setPassword(event: any) {
        console.log(event.target.value);
        this.password = "" + event.target.value;
    }

    public signIn(): Promise<void> {
        if (this.saving) {
            return Promise.resolve();
        }

        this.saving = true;
        return firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
            this._snackBar.open('Sign in successful', 'OK', {
                duration: 3000,
                panelClass: 'success-snack-bar'
            });
        }).catch(error => {
            console.error(error);
            this._snackBar.open(`Error: ${error.message || 'Unknown'}`, 'close', {
                duration: 0,
                panelClass: 'snack-bar-error'
            });
        }).then(() => {
            this.saving = false;
        });
    }

    public forgotPassword(): Promise<void> {
        if (this.saving) {
            return Promise.resolve();
        }

        this.saving = true;

        return firebase.auth().sendPasswordResetEmail(this.email).then(() => {
            this._snackBar.open('Password reset sent', 'OK', {
                duration: 3000,
                panelClass: 'success-snack-bar'
            });
        }).catch(error => {
            console.error(error);
            this._snackBar.open(`Error: ${error.message || 'Unknown'}`, 'close', {
                duration: 0,
                panelClass: 'snack-bar-error'
            });
        }).then(() => {
            this.saving = false;
        });
    }

    public updateFont(event: MatRadioChange) {
        console.log(event);

        this.fontOption = event.value;

        if (this.fontOption === 'Random') {
            this.settings.font = 'random';
        } else if (this.fontOption === 'Normal') {
            this.settings.font = 'normal';
        } else if (this.fontOption === 'Mr. Saturn Boing') {
            this.settings.font = 'boing';
        } else if (this.fontOption === 'Lumine Hall') {
            this.settings.font = 'lumine hall';
        }
    }

    public updateAllowMsgsFromChat(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowMsgsFromChat = !!event.checked;
    }

    // public updateVolume(event: MatSliderChange) {
    //     console.log(event);
    //     this.volumeStepperValue = event.value;
    //     this.settings.volume = event.value / 10;

    //     console.log(this.volumeStepperValue, this.settings.volume);
    // }

    public setAdditionalSaturns(event: any) {
        console.log(event.target.value);
        this.additionalSaturnsValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.additionalSaturns = Math.floor(num);
        }
    }

    public setLoopCount(event: any) {
        console.log(event.target.value);
        this.loopCountInputValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.loopCount = Math.floor(num);
        }
    }

    public setSaturnsLimit(event: any) {
        console.log(event.target.value);
        this.saturnsLimitInputValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.saturnsLimit = Math.floor(num);
        }
    }

    public updateAllowMilkman(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowMilkman = !!event.checked;
    }
    public updateMonaLisa(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowMonaLisa = !!event.checked;
    }
    public updateAllowOlives(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowOlives = !!event.checked;
    }
    public updateAllowRandomSprites(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowRandomSprites = !!event.checked;
    }
    public updateLoopRandomSprites(event: MatCheckboxChange) {
        console.log(event);

        this.settings.loopRandomSprites = !!event.checked;
    }

    public save() {
        if (this.saving) {
            return;
        }

        this.saving = true;

        return firebase.firestore().collection("saturns").doc('settings').update(this.settings).then(() => {
            this._snackBar.open('Settings saved', 'OK', {
                duration: 3000,
                panelClass: 'success-snack-bar'
            });
        }).catch(error => {
            console.error(error);
            this._snackBar.open(`Error: ${error.message || 'Unknown'}`, 'close', {
                duration: 0,
                panelClass: 'snack-bar-error'
            });
        }).then(() => {
            this.saving = false;
        });
    }
}
