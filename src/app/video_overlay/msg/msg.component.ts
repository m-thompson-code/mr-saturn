import { Component, OnInit, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Msg } from '../video_overlay.component';

@Component({
    selector: 'moo-msg',
    templateUrl: './msg.template.html',
    styleUrls: ['./msg.style.scss']
})
export class MsgComponent implements AfterViewInit, OnInit {
    @Input() box: any;
    @Output() destroyMsg: EventEmitter<void> = new EventEmitter();

    @Input() msg: Msg;

    fade: boolean;

    fontClass: string;

    constructor() {
    }

    ngOnInit() {
        if (this.msg.font === 'random') {
            const seed = Math.floor(21 * Math.random());
            
            if (seed === 0) {
                this.fontClass = 'lumine-hall-font';
            } else if (seed <= 10) {
                this.fontClass = '';
            } else {
                this.fontClass = 'saturn-boing-font';
            }
        } else if (this.msg.font === 'boing') {
            this.fontClass = 'saturn-boing-font';
        } else if (this.msg.font === 'lumine hall') {
            this.fontClass = 'lumine-hall-font';
        }

        setTimeout(() => {
            this.fade = true;
            
            setTimeout(() => {
                this.destroy();
            }, 1000);
        }, 1000);
    }

    ngAfterViewInit() {
    }

    destroy() {
        this.destroyMsg.emit();
    }
}
