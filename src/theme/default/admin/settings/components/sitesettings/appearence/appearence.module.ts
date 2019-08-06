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
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


// Shared Module
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../../../../default.material.module';
// Default Common Module
import {DefaultCommonModule} from '../../../../../default.common.module';
import {AppearenceRouting} from './appearence.routing';
//  Component
import {AppearenceComponent} from './appearence.component';


@NgModule({
    declarations: [
        AppearenceComponent

    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AppearenceRouting,
        TranslateModule.forChild()
    ],
    providers: [],
    bootstrap: [],
    entryComponents: []
})

export class AppearenceModule {
}
