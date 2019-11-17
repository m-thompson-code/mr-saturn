import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';
import { MatSliderChange } from '@angular/material/slider';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface FormSettings {
    font: 'random' | 'normal' | 'boing' | 'lumine hall';
    allowMsgsFromChat: boolean;
    allowMilkman: boolean;
    allowMonaLisa: boolean;
    allowOlives: boolean;
    allowRandomSprites: boolean;
    loopRandomSprites: boolean;
    volume: number;
    playSounds: boolean;
    limitSounds: boolean;
    motivationMinutes: number;
    motivationDuration: number;
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

    volumeStepperValue: number;

    fontOptions: FontOption[] = ['Random', 'Normal', 'Mr. Saturn Boing', 'Lumine Hall'];
    fontOption: FontOption;

    motivationMinutesInputValue: string;
    motivationDurationInputValue: string;
    additionalSaturnsValue: string;
    loopCountInputValue: string;
    saturnsLimitInputValue: string;

    saving: boolean = false;

    constructor(public router: Router, private _snackBar: MatSnackBar) {
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
                volume: doc.volume || 0,
                playSounds: doc.playSounds || false,
                limitSounds: doc.limitSounds || false,
                motivationMinutes: doc.motivationMinutes || 0,
                motivationDuration: doc.motivationDuration || 0,
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

            this.volumeStepperValue = (this.settings.volume || 0) * 10;

            this.motivationMinutesInputValue = "" + (this.settings.motivationMinutes || 0);
            this.motivationDurationInputValue = "" + (this.settings.motivationDuration || 0);

            this.loopCountInputValue = "" + (this.settings.loopCount || 0);
            this.saturnsLimitInputValue = "" + (this.settings.saturnsLimit || 0);
        });
    }

    updateFont(event: MatRadioChange) {
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

    updateAllowMsgsFromChat(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowMsgsFromChat = !!event.checked;
    }

    updatePlaySounds(event: MatCheckboxChange) {
        console.log(event);

        this.settings.playSounds = !!event.checked;
    }

    updateLimitSounds(event: MatCheckboxChange) {
        console.log(event);

        this.settings.limitSounds = !!event.checked;
    }

    updateVolume(event: MatSliderChange) {
        console.log(event);
        this.volumeStepperValue = event.value;
        this.settings.volume = event.value / 10;

        console.log(this.volumeStepperValue, this.settings.volume);
    }

    setMotivationMinutes(event: any) {
        console.log(event.target.value);
        this.motivationMinutesInputValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.motivationMinutes = Math.floor(num);
        }
    }

    setMotivationDuration(event: any) {
        console.log(event.target.value);
        this.motivationDurationInputValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.motivationDuration = Math.floor(num);
        }
    }

    setAdditionalSaturns(event: any) {
        console.log(event.target.value);
        this.additionalSaturnsValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.additionalSaturns = Math.floor(num);
        }
    }

    setLoopCount(event: any) {
        console.log(event.target.value);
        this.loopCountInputValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.loopCount = Math.floor(num);
        }
    }

    setSaturnsLimit(event: any) {
        console.log(event.target.value);
        this.saturnsLimitInputValue = event.target.value;

        const num = +event.target.value;

        if (!isNaN(num)) {
            this.settings.saturnsLimit = Math.floor(num);
        }
    }

    updateAllowMilkman(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowMilkman = !!event.checked;
    }
    updateMonaLisa(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowMonaLisa = !!event.checked;
    }
    updateAllowOlives(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowOlives = !!event.checked;
    }
    updateAllowRandomSprites(event: MatCheckboxChange) {
        console.log(event);

        this.settings.allowRandomSprites = !!event.checked;
    }
    updateLoopRandomSprites(event: MatCheckboxChange) {
        console.log(event);

        this.settings.loopRandomSprites = !!event.checked;
    }

    save() {
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
        })
    }
}
