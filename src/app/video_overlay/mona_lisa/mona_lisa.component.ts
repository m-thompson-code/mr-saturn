import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mona-lisa',
    templateUrl: './mona_lisa.template.html',
    styleUrls: ['./mona_lisa.style.scss']
})
export class MonaLisaComponent implements OnInit {
    status: string;
    
    activeMonaLisa: boolean;
    activeMonaLisaTimeout: any;//NodeJS.Timer;

    deactivateMonaLisaTimeout: any;//NodeJS.Timer;

    height: number;
    
    constructor() {
    }

    ngOnInit() {
        this.status = 'hide';
    }

    activate() {
        if (this.status === 'left' || this.status === 'right') {
            this.setupDeactivation();
        }

        if (this.status !== 'hide') {
            return;
        }

        this.status = 'peak';

        clearTimeout(this.activeMonaLisaTimeout);

        this.activeMonaLisaTimeout = setTimeout(() => {
            this.run();
        }, 1000);
    }

    run() {
        const seed = Math.floor(Math.random() * 2);

        if (!seed) {
            this.status = 'left';
        } else {
            this.status = 'right';
        }

        this.shift();
        this.shiftHeight();

        this.setupDeactivation();
    }

    setupDeactivation() {
        clearTimeout(this.deactivateMonaLisaTimeout);

        this.deactivateMonaLisaTimeout = setTimeout(() => {
            this.status = 'hide';
        }, 4000);
    }

    shift() {
        if (this.status !== 'left' && this.status !== 'right') {
            return;
        }

        if (this.status === 'left') {
            this.status = 'right';
        } else {
            this.status = 'left';
        }

        setTimeout(() => {
            this.shift();
        }, 1000);
    }

    shiftHeight() {
        if (this.status !== 'left' && this.status !== 'right') {
            return;
        }

        const seed = Math.floor(Math.random() * 3);
        this.height = seed + 1;

        setTimeout(() => {
            this.shiftHeight();
        }, 400);
    }
}
