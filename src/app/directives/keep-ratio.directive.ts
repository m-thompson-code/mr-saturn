import { Directive, ElementRef, HostListener, AfterViewInit, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[sapKeepRatio]',
})
export class KeepRatioDirective implements OnInit, AfterViewInit {
    @Input() public ratioHeight!: number;
    @Input() public ratioWidth!: number;

    @Input() public basedOnHeight?: boolean;
    @Input() public basedOnWidth?: boolean;

    private _debounceTimeout?: number;

    constructor(private element: ElementRef) {
    }

    public ngOnInit(): void {
        if (!this.ratioHeight) {
            const message = "Unexpected missing ratioHeight";
            console.error(message);
            throw {
                message: message,
            };
        }

        if (!this.ratioWidth) {
            const message = "Unexpected missing ratioWidth";
            console.error(message);
            throw {
                message: message,
            };
        }
    }

    @HostListener('window:resize') public onResize(): void {
        this._debouncedMaintainRatio(this.element.nativeElement);
    }
    
    @HostListener('window:orientationchange') public onOrientationChange(): void {
        this._debouncedMaintainRatio(this.element.nativeElement);
    }

    public ngAfterViewInit(): void {
        this._maintainRatio(this.element.nativeElement);

        // Safari/desktop doesn't handle this well on AfterViewInit, so we'll debouncing it and trying again
        // Safari issue on delivery/product: bottle and design will likely have the wrong width (fixes when you resize window)
        // IE 11 also doesn't maintain its ratio just right either, increasing debounce to 300ms
        window.setTimeout(() => {
            this._maintainRatio(this.element.nativeElement);
        }, 300);
    }

    // Maintains ratio based on height
    private _maintainRatio(element: HTMLElement): void {
        // Avoid erroring and keep normal workflow if we're missing anything
        if (!element || !this.ratioWidth || !this.ratioHeight) {
            return;
        }

        const rect =  element.getBoundingClientRect();

        // Avoiding getBoundingClientRect since we use animations a lot, which might be messing up calculations (Safari issue on delivery/product)
        // Safari issue on delivery/product: bottle and design will likely have the wrong width (fixes when you resize window)
        // source: https://stackoverflow.com/questions/43537559/javascript-getboundingclientrect-vs-offsetheight-while-calculate-element-heigh
        const rect_height = element.offsetHeight || rect.height;
        const rect_width = element.offsetWidth || rect.width;

        if (this.basedOnWidth) {
            const width: number = rect_width || 0;
            const height: number = this.ratioHeight * width / this.ratioWidth;

            // Results are suspect, it's more likely that the values aren't ready yet
            if (!width || !height || width < 5 || height < 5) {
                return;
            }

            element.style.height = `${height}px`;
        } else {
            const height: number = rect_height || 0;
            const width: number = this.ratioWidth * height / this.ratioHeight;

            // Results are suspect, it's more likely that the values aren't ready yet
            if (!width || !height || width < 5 || height < 5) {
                return;
            }

            element.style.width = `${width}px`;
        }
    }

    // @debounce(100)
    // @debounce decorator is only allowing the latest call to _debouncedMaintainRatio of any instance of this Class
    // This isn't ideal since there may be multiple elements using the KeepRatioDirective at the same time
    // To work around this, we are handing the debounce on our own
    private _debouncedMaintainRatio(element: HTMLElement): void {
        clearTimeout(this._debounceTimeout);
        this._debounceTimeout = window.setTimeout(() => {
            this._maintainRatio(element);
        }, 100);
    }
}
