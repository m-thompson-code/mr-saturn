import { Component, Input } from '@angular/core';

@Component({
    selector: 'milk-man',
    templateUrl: './milk_man.template.html',
    styleUrls: ['./milk_man.style.scss']
})
export class MilkManComponent {
    private _active: boolean;
    @Input()
    set active(active: boolean) {
        this._active = active;
        if (active) {
            this.getPath();
        }
    }
    get active(): boolean {
        return this._active;
    };
    
    path: string;
    constructor() {
    }

    getPath() {
        const seed = Math.floor(Math.random() * 2);
        if (seed) {
            this.path = "assets/milk_man.jpg";
        } else {
            this.path = "assets/fbi_milk_man.jpg";
        }
    }
}
