import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { colorToFilterData } from './colors';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

export interface Eyes {
    classStr: string;

    open: boolean;

    maxGitter?: number;
    minGitter?: number;

    stutterChance?: number;
    maxStutter?: number;
    minStutter?: number;

    minOpacity?: number;
    maxOpacity?: number;
    stillOpacity?: number;
    opacityChance?: number;

    minOffsetX?: number;
    maxOffsetX?: number;
    minOffsetY?: number;
    maxOffsetY?: number;

    width: number;

    colorChance?: number;
}

@Component({
    selector: 'eyes',
    templateUrl: './eyes.template.html',
    styleUrls: ['./eyes.style.scss']
})
export class EyesComponent implements OnInit {
    private gitterX: number;
    private gitterY: number;

    private stutterX: number;
    private stutterY: number;
    
    public opacity: number;

    @Input() public eyes: Eyes;
    @Input() public openChange: boolean;

    public left: string;
    public top: string;

    public offsetX: number;
    public offsetY: number;

    public filter?: SafeStyle | string;

    public eyePngIndex: number;
    public eyePng: string;

    constructor(private ref: ChangeDetectorRef, private ngZone: NgZone, private domSanitizer: DomSanitizer) {

    }

    ngOnInit() {
        this.eyes.maxGitter = this.eyes.maxGitter || 0;
        this.eyes.minGitter = this.eyes.minGitter || 0;
        this.gitterX = this.gitterX || 0;
        this.gitterY = this.gitterY || 0;

        this.eyes.maxStutter = this.eyes.maxStutter || 0;
        this.eyes.minStutter = this.eyes.minStutter || 0;
        this.stutterX = this.stutterX || 0;
        this.stutterY = this.stutterY || 0;

        if (this.eyes.minGitter || this.eyes.maxGitter) {
            this.gitterFunc();
        }

        this.eyes.stutterChance = this.eyes.stutterChance || 0;

        if (this.eyes.minStutter || this.eyes.maxStutter) {
            this.stutterFunc();
        }

        this.eyes.stillOpacity = this.eyes.stillOpacity || 0;
        this.opacity = this.eyes.stillOpacity || this.eyes.maxOpacity || 1;

        if (this.eyes.minOpacity || this.eyes.maxOpacity) {
            this.opacityFunc();
        }

        this.eyes.maxOffsetX = this.eyes.maxOffsetX || 0;
        this.eyes.minOffsetX = this.eyes.minOffsetX || 0;
        this.eyes.maxOffsetY = this.eyes.maxOffsetY || 0;
        this.eyes.minOffsetY = this.eyes.minOffsetY || 0;

        this.offsetFunc();

        this.eyes.colorChance = this.eyes.colorChance || 0;

        if (this.eyes.colorChance) {
            this.colorFunc();
        }

        this._updatePosition();

        if (this.eyes.open) {
            this.eyePngIndex = 7;

            const seed = Math.floor(Math.random() * 7);

            if (seed === 0) {
                this.eyePngIndex = 1;
            }
        } else {
            this.eyePngIndex = 1;
        }

        this.animateEyes();
    }

    public gitterFunc(): void {
        this.gitterX = this._getRand(this.eyes.minGitter, this.eyes.maxGitter) - this._getRand(this.eyes.minGitter, this.eyes.maxGitter);
        this.gitterY = this._getRand(this.eyes.minGitter, this.eyes.maxGitter) - this._getRand(this.eyes.minGitter, this.eyes.maxGitter);

        this._updatePosition();

        setTimeout(() => {
            this.gitterFunc();
        }, 50);
    }

    public stutterFunc(): void {
        const _seed = Math.floor(Math.random() * this.eyes.stutterChance);

        if (_seed !== 0) {
            this.stutterX = 0;
            this.stutterY = 0;
        } else {
            this.stutterX = this._getRand(this.eyes.minStutter, this.eyes.maxStutter) - this._getRand(this.eyes.minStutter, this.eyes.maxStutter);
            this.stutterY = this._getRand(this.eyes.minStutter, this.eyes.maxStutter) - this._getRand(this.eyes.minStutter, this.eyes.maxStutter);
        }

        this._updatePosition();

        setTimeout(() => {
            this.stutterFunc();
        }, 120);
    }
    
    public opacityFunc(): void {
        const _seed = Math.floor(Math.random() * this.eyes.opacityChance);

        if (_seed !== 0) {
            this.opacity = this.eyes.stillOpacity || this.opacity;
        } else {
            this.opacity = this._getRand(this.eyes.minOpacity, this.eyes.maxOpacity);
        }

        this._updatePosition();

        setTimeout(() => {
            this.opacityFunc();
        }, 180);
    }

    public offsetFunc(): void {
        this.offsetX = this._getRand(this.eyes.minOffsetX, this.eyes.maxOffsetX) - this._getRand(this.eyes.minOffsetX, this.eyes.maxOffsetX);
        this.offsetY = this._getRand(this.eyes.minOffsetY, this.eyes.maxOffsetY) - this._getRand(this.eyes.minOffsetY, this.eyes.maxOffsetY);
    }

    public colorFunc(): void {
        const _seed = Math.floor(Math.random() * this.eyes.colorChance);

        if (_seed === 0) {
            const _red = Math.floor(Math.random() * 24) + 10;
            const _green = Math.floor(Math.random() * 24) + 10;
            const _blue = Math.floor(Math.random() * 24) + 10;
            const _f = colorToFilterData(`#${_red}${_green}${_blue}`).result.filter;

            let __f = _f.substring(8, _f.length -1);
    
            this.filter = this.domSanitizer.bypassSecurityTrustStyle(__f);
        } else {
            this.filter = "none";
        }
        
        setTimeout(() => {
            this.colorFunc();
        }, 300);
    }

    private _getRand(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    private _updatePosition(): void {
        let left = 50 + this.gitterX + this.stutterX + this.offsetX;
        let top = 50 + this.gitterY + this.stutterY + this.offsetY;

        const min = 50 - this.eyes.width / 2;

        if (left < min) {
            left = min;
        } else if (left > min + this.eyes.width) {
            left = min + this.eyes.width;
        }

        if (top < 25) {
            top = 25;
        } else if (top > 75) {
            top = 75;
        }

        this.left = `${left}%`;
        this.top = `${top}%`;
    }

    ngAfterViewInit() {
        
    }

    public updateEyeIndex(): void {
        if (this.eyes.open) {
            this.eyePngIndex += 1;

            if (this.eyePngIndex > 10) {
                const seed = Math.floor(Math.random() * 7);

                if (seed  === 0) {
                    this.eyePngIndex = 1;
                } else if (seed < 4) {
                    this.eyePngIndex = 7;
                } else {
                    this.eyePngIndex = 8;
                }
            }
        } else {
            const seed = Math.floor(Math.random() * 14);

            if (seed === 0) {
                this.eyePngIndex = 2;
            } else if (seed === 1) {
                this.eyePngIndex = 3;
            } else {
                this.eyePngIndex = 1;
            }
        }
    }

    public animateEyes(): void {
        this.updateEyeIndex();

        if (this.eyePngIndex === 10) {
            this.eyePng = 'eyes_10.png';
        } else {
            this.eyePng = `eyes_0${this.eyePngIndex}.png`;
        }

        let delay = 1000 / 24;

        if (this.eyePngIndex > 7) {
            delay = 200;
        }

        setTimeout(() => {
            this.animateEyes();
        }, delay);
    }

    // ngOnDestroy() {
    //     clearTimeout(this.gitterTimeout);
    // }
}
