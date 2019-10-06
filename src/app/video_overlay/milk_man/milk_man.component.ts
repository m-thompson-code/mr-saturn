import { Component, Input } from '@angular/core';

@Component({
    selector: 'milk-man',
    templateUrl: './milk_man.template.html',
    styleUrls: ['./milk_man.style.scss']
})
export class MilkManComponent {
    @Input() active: boolean;
    
    constructor() {
    }
}
