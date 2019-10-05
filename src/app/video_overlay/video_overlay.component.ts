import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';

interface TwitchCommand {
    commandName: string;
    milkMan: boolean;
}

interface Saturn {
    moving: boolean;
}

@Component({
    selector: 'rr-video-overlay',
    templateUrl: './video_overlay.template.html',
    styleUrls: ['./video_overlay.style.scss']
})
export class VideoOverlayComponent {
    saturns: Saturn[];

    milkManTimeout: any;//NodeJS.Timer;

    activeMilkMan: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.saturns = [];
        this.loop(10);

        let skip = true;

        firebase.firestore().collection("saturns").doc('saturn0').onSnapshot(docSnapshot => {
            if (skip) {
                skip = false;
                return;
            }

            const doc = docSnapshot.data() as TwitchCommand;

            console.log("Current data: ", docSnapshot.data());

            if (doc.milkMan) {
                this.activateMilkMan();
            }

            if (doc.commandName) {
                for (let i = 0; i < Math.floor((doc.commandName.length / 10)); i++) {
                    this.saturns.push({moving: true});
                    console.log("saturn");
                }
            }
            
            this.saturns.push({moving: true});
        });
    }

    activateMilkMan() {
        clearTimeout(this.milkManTimeout);
        
        this.activeMilkMan = true;

        this.milkManTimeout = setTimeout(() => {
            this.activeMilkMan = false;
        }, 5000);
    }

    loop(count: number, saturn?: Saturn) {
        for (let i = 0; i < count; i++) {
            this.saturns.push({moving: true});
        }
    }

    destroy(index: number) {
        this.saturns[index].moving = false;

        for (let saturn of this.saturns) {
            console.log(saturn);
            if (saturn.moving) {
                // break;
                return;
            }
        }

        this.saturns = [];

        // if (!this.saturns.length) {
        //     setTimeout(() => {
        //         this.loop(3);
        //     }, 1);
        // }
    }
}
