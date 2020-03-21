import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';

interface Eye {

}

@Component({
    selector: 'eyes',
    templateUrl: './eyes.template.html',
    styleUrls: ['./eyes.style.scss']
})
export class EyesComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() box: HTMLDivElement;
    @ViewChild('img') img: ElementRef;

    deltaX: number;
    deltaY: number;

    gitterTimeout: any;

    imgWidth =  448;
    imgHeight = 180;

    @Input() gitter: number;

    @Input() initRatio: number;
    @Input() afterRatio: number;

    @Input() extraClass: string;
    @Input() extraClassAfter: string;
    _extraClassAfter: string;

    width: number = 0;
    height: number = 0;

    eyes: Eye[];

    offsetX: number = 0;
    offsetY: number = 0;

    maxDeltaX: number = 0;
    maxDeltaY: number = 0;

    @Input() open: boolean;

    constructor(private ref: ChangeDetectorRef, private ngZone: NgZone) {

    }

    ngOnInit() {
        this.deltaX = 0;
        this.deltaY = 0;

        this.width = this.initRatio * this.imgWidth;
        this.height = this.initRatio * this.imgHeight;

        this.gitterFunc();
    }

    ngAfterViewInit() {
        this.ref.detectChanges();
        // debugger;
        setTimeout(() => {

            this.ngZone.run(() => {
                // const width = this.afterRatio * this.imgWidth;
                // const height = this.afterRatio * this.imgHeight;

                this.width = this.afterRatio * this.imgWidth;
                this.height = this.afterRatio * this.imgHeight;

                this.maxDeltaX = this.box.offsetWidth / 2 - this.width / 2;
                this.maxDeltaY = this.box.offsetHeight / 2 - this.height / 2;

                // this.offsetX = -this.maxDeltaX;
                // this.offsetY = -this.maxDeltaY;

                this._extraClassAfter = this.extraClassAfter;

                this.ref.detectChanges();
            });
        }, 1);
    }

    getRand() {
        const x = Math.random() * this.gitter * 2 - this.gitter;
        const y = Math.random() * this.gitter * 2 - this.gitter;

        this.deltaX = x;
        this.deltaY = y;
    }

    getX() {
        let x = Math.random() * this.gitter * 2 - this.gitter;

        x += this.offsetX;

        if (x > this.maxDeltaX) {
            x = this.maxDeltaX;
        } else if (x < -this.maxDeltaX) {
            x = -this.maxDeltaX;
        }

        return x;
    }

    getY() {
        let y = Math.random() * this.gitter * 2 - this.gitter;

        y += this.offsetY;

        if (y > this.maxDeltaY) {
            y = this.maxDeltaY;
        } else if (y < -this.maxDeltaY) {
            y = -this.maxDeltaY;
        }

        return y;
    }

    gitterFunc() {
        this.getRand();

        this.gitterTimeout = setTimeout(() => {
            this.gitterFunc();
        }, 100);
    }

    ngOnDestroy() {
        clearTimeout(this.gitterTimeout);
    }
}
