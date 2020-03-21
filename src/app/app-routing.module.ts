import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoOverlayComponent } from './video_overlay/video_overlay.component';
import { JumpScareComponent } from './jumpScare/jumpScare.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
    {
        path: '',
        component: VideoOverlayComponent
    },
    {
        path: 'video_overlay',
        component: VideoOverlayComponent
    },
    {
        path: 'config',
        component:ConfigComponent
    },
    {
        path: 'jump_scare',
        component: JumpScareComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
