import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

interface Eyes {
    initRatio: number;
    afterRatio: number;
    gitter: number;
    extraClass?: string;
    extraClassAfter?: string;
    open: boolean;
}

@Component({
    selector: 'rr-jump-scare',
    templateUrl: './jumpScare.template.html',
    styleUrls: ['./jumpScare.style.scss']
})
export class JumpScareComponent implements OnInit, AfterViewInit {
    @ViewChild("openEyesPlaceholder", {static: true}) openEyesPlaceholder: ElementRef;

    loading1: boolean;
    loading2: boolean;
    loading: boolean;
    // player1: HTMLAudioElement;

    // @ViewChild('mr_saturn_sfx_1', {static: false}) set playerRef1(ref: ElementRef<HTMLAudioElement>) {
    //     if (ref && ref.nativeElement) {
    //         this.player1 = ref.nativeElement;
    //     }
    // }

    eyeses: Eyes[] = [];

    JSON: any;

    constructor() {
    }

    ngOnInit() {
        this.JSON = JSON;
        this.loading = true;

        var src = window.getComputedStyle(this.openEyesPlaceholder.nativeElement)['background-image'];
        var src2 = window.getComputedStyle(this.openEyesPlaceholder.nativeElement)['background-image'];

        var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
        var url2 = src2.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

        var img = new Image();
        var img2 = new Image();

        img.onload = () => {
            this.loading1 = false;

            if (!this.loading1 && !this.loading2) {
                this.loading = false;
            }
            
            console.log("background loaded 1");
        };

        img2.onload = () => {
            this.loading2 = false;

            if (!this.loading1 && !this.loading2) {
                this.loading = false;
            }
            
            console.log("background loaded 2");
        };

        img.src = url;
        img2.src = url2;

        this.init();
    }

    init() {
        this.eyeses.push({
            initRatio: .2,
            afterRatio: .7,
            gitter: .5,
            extraClass: 'slow',
            extraClassAfter: 'slow-after',
            open: false
        });

        console.log(this.eyeses);

        setTimeout(() => {
            this.next();
        }, 3000);
    }

    next() {
        this.eyeses = [];

        this.eyeses = [
            {
                initRatio: 1,
                afterRatio: 1,
                gitter: .5,
                open: true,
            },
            {
                initRatio: 1,
                afterRatio: 1,
                gitter: 4,
                extraClass: 'faded',
                open: true
            },
            {
                initRatio: 1,
                afterRatio: 1,
                gitter: 8,
                extraClass: 'faded-extra',
                open: true
            },
        ];

        const m = {
            initRatio: 1,
            afterRatio: 1.5,
            gitter: 0,
            extraClass: 'fast',
            extraClassAfter: 'fast-after',
            open: true
        };

        this.eyeses.push(m);

        // setTimeout(() => {
        //     debugger;
        // }, 500);

        setTimeout(() => {
            for (let i = 0; i < this.eyeses.length; i++) {
                const eyes = this.eyeses[i];

                if (eyes === m ) {
                    this.eyeses.splice(i, 1);
                }
            }
        }, 1000);
    }

    ngAfterViewInit() {

    }
}
