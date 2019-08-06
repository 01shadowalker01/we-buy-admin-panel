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
import {DefaultCommonModule} from '../../../../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import {OrderStatusAddComponent} from './add/add.component';
import {OrderStatusListComponent} from './list/list.component';

// Store Actions

// Routing Module
import {OrderStatusRoutingModule} from './orderstatus.routing';

// Shared Module
import {MaterialModule} from '../../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ColorPickerModule} from 'ngx-color-picker';
import {HttpLoaderFactory} from '../../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        OrderStatusAddComponent,
        OrderStatusListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        OrderStatusRoutingModule,
        // EffectsModule.forRoot([OrderstatusEffects]),
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        ColorPickerModule
    ],
    providers: [
        // OrderstatusApiClientService,
        // OrderstatusSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class OrderStatusModule {
}
