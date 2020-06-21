import { Component, OnInit, Input } from '@angular/core';

import { Olive } from './olive/olive.component';

export interface Container {
    x: number;
    olives: Olive[];
}

@Component({
    selector: 'olives',
    templateUrl: './olives.template.html',
    styleUrls: ['./olives.style.scss']
})
export class OlivesComponent implements OnInit {
    containers: Container[];

    @Input() maxWidth: number;
    @Input() maxHeight: number;

    removeOlivesTimeout: any;////NodeJS.Timer;

    constructor() {
    }

    ngOnInit() {
        this.containers = [];
        this.pushOlive();
    }
    
    setupDeactivateOlives(delay: number) {
        clearTimeout(this.removeOlivesTimeout);

        this.removeOlivesTimeout = setTimeout(() => {
            if (this.popOlive()) {
                this.setupDeactivateOlives(600);
            }
        }, delay);
    }

    pushContainer() {
        const container: Container = {
            x: Math.floor(Math.random() * this.maxWidth),
            olives: []
        }

        if (container.x < 32) {
            container.x = 32;
        }

        this.containers.push(container);
    }

    popOlive(): Olive {
        if (!this.containers.length) {
            return;
        }

        const olive = this.containers[this.containers.length - 1].olives.pop();

        if (!this.containers[this.containers.length - 1].olives.length) {
            this.containers.pop();
        }

        return olive;
    }

    clearOlives() {
        this.containers = [];
    }

    pushOlive() {
        // console.log('pushing');

        if (this.containers && this.containers.length > 100) {
            // exit early so we don't lag out lol
            return;
        }

        this.setupDeactivateOlives(20 * 1000);

        if (!this.containers.length) {
            this.pushContainer();
        }

        let maxHeight = this.maxHeight;

        if (this.maxHeight < 100) {
            maxHeight = 100;
        }

        if ((this.containers[this.containers.length - 1].olives.length + 1) * 20 > maxHeight) {
            this.pushContainer();
        }

        const olive = {
            angle: Math.random() * 10
        }

        const seed = Math.floor(Math.random() * 2);
        if (!seed) {
            olive.angle = -olive.angle;
        }

        this.containers[this.containers.length - 1].olives.push(olive);
        if (this.containers.length === 1 && this.containers[0].olives.length < 3) {
            this.pushOlive();
        }
    }

    pushOlives(count: number) {
        for (let i = 0; i < count; i++) {
            this.pushOlive();
        }
    }
}
