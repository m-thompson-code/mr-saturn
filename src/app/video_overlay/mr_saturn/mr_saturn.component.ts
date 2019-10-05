import { Component, OnInit, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mr-saturn',
    templateUrl: './mr_saturn.template.html',
    styleUrls: ['./mr_saturn.style.scss']
})
export class MrSaturnComponent implements AfterViewInit, OnInit {
    @Input() box: any;
    @Output() toDestroy: EventEmitter<void> = new EventEmitter();

    t: number;

    x: number;
    y: number;

    xx: number;
    yy: number;

    gravity: number;

    constructor() {
    }

    ngOnInit() {
        this.gravity = 0.1;
        this.x = 0;
        this.y = -20;
    }

    ngAfterViewInit() {
        this.init();
        this.loop();
    }

    init() {
        this.x = 0;
        this.y = -20;

        this.t = 0;
        
        const max_height = this.box && this.box && this.box.offsetHeight || 100;//552;//window.innerHeight;
        const max_width = this.box && this.box && this.box.offsetWidth || 100;

        const width = (max_width * 3 + max_width * 7 * Math.random()) / 10;
        const height = (max_height * 3 + max_height * 7 * Math.random()) / 10;

        const t = 120;

        this.yy = height / t - (-this.gravity * t / 2); // + 3 * Math.random();
        console.log(this.yy);

        // const landing_t = 2 * this.yy / this.gravity;
        console.log("should be", t);

        this.xx = width / t / 2 || 2;
    }

    loop() {
        if (this.y <= -40) {//} -80) {
            console.log("it was", this.t);
            this.destroy();
            return;
        }

        setTimeout(() => {
            this.t += 1;
            this.yy -= this.gravity;// gravity

            this.y += this.yy;
            this.x += this.xx;

            this.loop();
        }, 1);
    }

    destroy() {
        this.toDestroy.emit();
    }
}
