import { Component, OnInit, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Saturn } from '../video_overlay.component';

@Component({
    selector: 'mr-saturn',
    templateUrl: './mr_saturn.template.html',
    styleUrls: ['./mr_saturn.style.scss']
})
export class MrSaturnComponent implements AfterViewInit, OnInit {
    @Input() box: any;
    // @Output() toDestroy: EventEmitter<void> = new EventEmitter();

    @Input() saturn: Saturn;

    // xx: number;
    // yy: number;

    // gravity: number;

    // destroyed: boolean;

    // max_height: number;
    // max_width: number;

    constructor() {
    }

    ngOnInit() {
    //     this.gravity = 0.1;
    //     this.saturn.x = 0;
    //     this.saturn.y = -20;
    }

    ngAfterViewInit() {
    //     this.init();
    //     this.loop();
    }

    // init() {
    //     this.saturn.x = 0;
    //     this.saturn.y = -20;
        
    //     this.max_height = (this.box && this.box && this.box.offsetHeight || 100) - 40;// 40 pixels for the size of the sprite
    //     this.max_width = this.box && this.box && this.box.offsetWidth || 100;

    //     const width = (this.max_width * 3 + this.max_width * 7 * Math.random()) / 10;
    //     const height = (this.max_height * 5 + this.max_height * 5 * Math.random()) / 10;

    //     // Min test
    //     // const width = this.max_width * 3 / 10;
    //     // const height = this.max_height * 5 / 10;

    //     // Max test
    //     // const width = this.max_width;
    //     // const height = this.max_height;

    //     const t = 120;

    //     this.yy = height / t - (-this.gravity * t / 2);

    //     this.xx = width / t / 2 || 2;
    // }

    // loop() {
    //     if (this.saturn.y <= -60) {//} -80) {
    //         // console.log("it was", this.t);
    //         this.destroy();
    //         return;
    //     }

    //     setTimeout(() => {
    //         this.yy -= this.gravity;// gravity

    //         this.saturn.y += this.yy;
    //         if (this.saturn.y > this.max_height) {
    //             this.saturn.y = this.max_height;
    //             if (this.yy > 0) {
    //                 this.yy = 0;
    //             }
    //         }

    //         this.saturn.x += this.xx;

    //         if (this.saturn.x > this.max_width) {
    //             this.saturn.x = this.max_width;
    //             if (this.xx > 0) {
    //                 this.xx = -this.xx;
    //             }
    //         }

    //         this.loop();
    //     }, 1);
    // }

    // destroy() {
    //     this.destroyed = true;
    //     this.toDestroy.emit();
    // }
}
