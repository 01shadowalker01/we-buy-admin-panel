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
import {DefaultCommonModule} from '../../../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import {OrderAddComponent} from './add/add.component';
import {OrderListComponent} from './list/list.component';
import {OrderFilterComponent} from './filter/filter.component';

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {OrdersSandbox} from '../../../../../../core/admin/sales/orders/orders-sandbox';
import {OrdersService} from '../../../../../../core/admin/sales/orders/orders.service';
import {OrdersEffects} from '../../../../../../core/admin/sales/orders/orders-effects/orders.effects';

// Routing Module
import {OrderRoutingModule} from './orders.routing';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ViewOrdersComponent} from './vieworders/vieworders.component';
import {OrderstatusSandbox} from '../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import {HttpLoaderFactory} from '../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        OrderAddComponent,
        OrderListComponent,
        OrderFilterComponent,
        ViewOrdersComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        OrderRoutingModule,
        EffectsModule.forRoot([OrdersEffects]),
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
        OrdersService,
        OrdersSandbox,
        OrderstatusSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class OrdersModule {
}
