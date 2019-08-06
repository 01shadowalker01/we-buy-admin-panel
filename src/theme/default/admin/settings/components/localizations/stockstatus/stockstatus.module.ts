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
import {StockStatusAddComponent} from './add/add.component';
import {StockStatusListComponent} from './list/list.component';

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {StockEffects} from '../../../../../../../core/admin/settings/localizations/stockStatus/stock-effect/stock.effect';
import {StockSandbox} from '../../../../../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import {StockService} from '../../../../../../../core/admin/settings/localizations/stockStatus/stock.service';

// Routing Module
import {StockStatusRoutingModule} from './stockstatus.routing';

// Shared Module
import {MaterialModule} from '../../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        StockStatusAddComponent,
        StockStatusListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        StockStatusRoutingModule,
        EffectsModule.forRoot([StockEffects]),
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
    ],
    providers: [
        StockService,
        StockSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class StockStatusModule {
}
