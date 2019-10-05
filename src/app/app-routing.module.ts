import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoOverlayComponent } from './video_overlay/video_overlay.component';
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
    // {
    //     path: 'live_config',
    //     component: LiveConfigComponent
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
