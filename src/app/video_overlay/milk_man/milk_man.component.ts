import { Component, OnInit, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'milk-man',
    templateUrl: './milk_man.template.html',
    styleUrls: ['./milk_man.style.scss']
})
export class MilkManComponent implements AfterViewInit, OnInit {
    @Input() active: boolean;
    
    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }
}
