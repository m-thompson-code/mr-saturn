import { Component, Input, OnInit } from '@angular/core';

import { Saturn } from '../video_overlay.component';

@Component({
    selector: 'mr-saturn',
    templateUrl: './mr_saturn.template.html',
    styleUrls: ['./mr_saturn.style.scss']
})
export class MrSaturnComponent implements OnInit {
    @Input() saturn: Saturn;

    spin: number;
    imgPath: string;

    flipX: boolean;
    flipY: boolean;

    constructor() {
    }

    ngOnInit() {
        this.flipX = !!Math.floor(Math.random() * 2);
        this.flipY = !!Math.floor(Math.random() * 2);
        this.spin = Math.floor(Math.random() * 24) * 15;

        const useOlive = !(Math.floor(Math.random() * 50));

        if (useOlive) {
            this.imgPath = `assets/olive1x32.png`;
        } else {
            const useAlt = !(Math.floor(Math.random() * 12));

            // const seed = Math.floor(Math.random() * 5);// I don't like the 5th one, it looks too much like the 4th
            const seed = Math.floor(Math.random() * 4);

            this.imgPath = `assets/spr${seed + 1}${useAlt ? 'b' : ''}x2.gif`;
        }
    }
}
