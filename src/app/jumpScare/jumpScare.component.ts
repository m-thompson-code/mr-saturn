import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Eyes } from './eyes/eyes.component';

@Component({
    selector: 'moo-jump-scare',
    templateUrl: './jumpScare.template.html',
    styleUrls: ['./jumpScare.style.scss']
})
export class JumpScareComponent implements OnInit, AfterViewInit {
    // @ViewChild("openEyesPlaceholder", {static: true}) openEyesPlaceholder: ElementRef;
    @ViewChild("crying", {static: true}) crying: ElementRef<HTMLMediaElement>;
    @ViewChild("scream", {static: true}) scream: ElementRef<HTMLMediaElement>;
    @ViewChild("heartbeat", {static: true}) heartbeat: ElementRef<HTMLMediaElement>;

    loading1: boolean;
    loading2: boolean;
    loading: boolean;

    mainEyeses: Eyes[] = [];
    eyeses: Eyes[] = [];

    JSON: any;

    addEyesTimeout?: number;

    constructor() {
    }

    ngOnInit() {
        const imageUrls = [
            '../../../assets/jumpScare/eyes/eyes_01.png',
            '../../../assets/jumpScare/eyes/eyes_02.png',
            '../../../assets/jumpScare/eyes/eyes_03.png',
            '../../../assets/jumpScare/eyes/eyes_04.png',
            '../../../assets/jumpScare/eyes/eyes_05.png',
            '../../../assets/jumpScare/eyes/eyes_06.png',
            '../../../assets/jumpScare/eyes/eyes_07.png',
            '../../../assets/jumpScare/eyes/eyes_08.png',
            '../../../assets/jumpScare/eyes/eyes_09.png',
            '../../../assets/jumpScare/eyes/eyes_10.png',
        ];

        this.loading = true;

        this.preloadImages(imageUrls).then(() => {
            this.loading = false;

            this.init();
        });
    }

    public preloadImages(urls: string[]): Promise<void> {
        const promises = [];

        for (const url of urls) {
            promises.push(this.preloadImage(url));
        }
        
        return Promise.all(promises).then(() => {
            // console.log("preloaded images");
        });
    }

    public preloadImage(url: string): Promise<void> {
        return new Promise((resolve) => {
            const _img = new Image();

            _img.onload = () => {
                // console.log('loaded', url);
                resolve();
            };

            _img.onerror = (error) => {
                console.error('error', error, url);
                resolve();
            };
    
            _img.src = url;
        });
    }

    init() {
        this.crying.nativeElement.currentTime = 0;
        this.crying.nativeElement.volume = .3;
        this.crying.nativeElement.play();

        this.heartbeat.nativeElement.currentTime = 0;
        // this.heartbeat.nativeElement.volume = .3;
        this.heartbeat.nativeElement.play();

        this.mainEyeses = [];
        this.mainEyeses.push({
            classStr: 'test',

            open: false,

            maxGitter: .5,
            minGitter: .25,

            stutterChance: 7,
            maxStutter: 20,
            minStutter: 15,

            minOpacity: .5,
            maxOpacity: .75,
            stillOpacity: 1,
            opacityChance: 3,

            width: 40,
        });


        this.mainEyeses.push({
            classStr: 'test-shade',

            open: false,

            maxGitter: .25,
            minGitter: 0,

            stutterChance: 5,
            maxStutter: 25,
            minStutter: 20,

            minOpacity: 0,
            maxOpacity: .3,
            stillOpacity: 0,
            opacityChance: 0,

            width: 40,
            colorChance: 10,
        });

        this.eyeses = [];

        setTimeout(() => {
            this.next();
        }, 6000);
    }

    next() {
        this.scream.nativeElement.currentTime = 0;
        this.scream.nativeElement.play();

        this.mainEyeses[0].classStr = "test-2";
        this.mainEyeses[0].open = true;
        this.mainEyeses[0].minGitter = .25;
        this.mainEyeses[0].maxGitter = .75;
        this.mainEyeses[0].minOpacity = .75;
        this.mainEyeses[0].maxOpacity = 1;
        this.mainEyeses[0].width = 60;
        // this.eyeses = [];

        this.mainEyeses[1].classStr = "test-2-shade";
        this.mainEyeses[1].open = true;
        this.mainEyeses[1].minGitter = .2;
        this.mainEyeses[1].maxGitter = .75;
        this.mainEyeses[1].width = 60;

        this.mainEyeses.push({
            classStr: 'test-2-shade',

            open: true,

            maxGitter: .25,
            minGitter: 0,

            stutterChance: 20,
            maxStutter: 25,
            minStutter: 20,

            minOpacity: .2,
            maxOpacity: .4,
            stillOpacity: 0,
            opacityChance: 10,

            width: 60,
            colorChance: 3,
        });

        setTimeout(() => {
            this.eyeses = [];

            this.eyeses.push({
                classStr: 'eyes-8',

                open: true,

                maxGitter: .7,
                minGitter: .5,

                stutterChance: 3,
                maxStutter: 5,
                minStutter: 15,

                minOpacity: .3,
                maxOpacity: 1,
                stillOpacity: 0,
                opacityChance: 9,

                maxOffsetX: 10,
                minOffsetX: 5,
                maxOffsetY: 10,
                minOffsetY: 5,

                width: 80,
                colorChance: 1,
            });


            setTimeout(() => {
                this.eyeses.shift();
                this.addEyesLoop();
            }, 400);
        }, (1000 / 24) * 10);
    }

    public addEyesLoop(): void {
        if (this.eyeses.length > 5) {
            return;
        }

        const seed = Math.floor(Math.random() * 10) + 1;
        this.eyeses.push({
            classStr: 'eyes-' + seed,

            open: true,

            maxGitter: .7,
            minGitter: .5,

            stutterChance: 5,
            maxStutter: 15,
            minStutter: 5,

            minOpacity: .1,
            maxOpacity: Math.random() * 7 / 10 + .1,
            stillOpacity: 0,
            opacityChance: 3,

            maxOffsetX: 50 - seed * 10 / 2,
            minOffsetX: 0,
            maxOffsetY: 50 - seed * 10 / 2,
            minOffsetY: 0,

            width: seed * 10,
            colorChance: 3,
        });

        setTimeout(() => {
            this.eyeses.shift();
        }, 400 + 400 * Math.random());

        this.addEyesTimeout = window.setTimeout(() => {
            this.addEyesLoop();
        }, 100 + 800 * Math.random());
    }

    ngAfterViewInit() {
        clearTimeout(this.addEyesTimeout);
    }
}
