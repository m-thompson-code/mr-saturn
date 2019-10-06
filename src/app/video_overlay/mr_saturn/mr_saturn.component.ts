import { Component, Input } from '@angular/core';

import { Saturn } from '../video_overlay.component';

@Component({
    selector: 'mr-saturn',
    templateUrl: './mr_saturn.template.html',
    styleUrls: ['./mr_saturn.style.scss']
})
export class MrSaturnComponent {
    @Input() saturn: Saturn;

    constructor() {
    }
}
