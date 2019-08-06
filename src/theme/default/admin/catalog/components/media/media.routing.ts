/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

// Component
import {MediaComponent} from './media.component';

const mediaRoutes: Routes = [

    {path: '', component: MediaComponent},

];

@NgModule({
    imports: [
        RouterModule.forChild(mediaRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MediaRouting {
}
