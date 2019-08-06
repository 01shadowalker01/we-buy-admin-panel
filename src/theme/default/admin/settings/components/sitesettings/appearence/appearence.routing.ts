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
import {AppearenceComponent} from './appearence.component';

const appearenceRoutes: Routes = [
    {path: '', component: AppearenceComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(appearenceRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppearenceRouting {
}
