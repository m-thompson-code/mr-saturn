import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

export interface Olive {
    angle: number;
}

@Component({
    selector: 'olive',
    templateUrl: './olive.template.html',
    styleUrls: ['./olive.style.scss']
})
export class OliveComponent implements OnInit, AfterViewInit {
    @Input() olive: Olive;
    @Input() olivesLength: number;
    @Input() i: number;

    init: boolean;

    imgPath: string;

    isSaturn: boolean;

    constructor() {
    }

    ngOnInit() {
        this.init = true;

        const useSaturn = !(Math.floor(Math.random() * 20));

        if (useSaturn) {
            this.isSaturn = true;
            const useAlt = !(Math.floor(Math.random() * 12));

            const seed = Math.floor(Math.random() * 4);

            this.imgPath = `assets/spr${seed + 1}${useAlt ? 'b' : ''}x2.gif`;

            this.olive.angle = Math.random() * 360;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.init = false;
        }, 0);
    }
}
