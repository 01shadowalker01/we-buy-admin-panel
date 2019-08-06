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
import {DefaultCommonModule} from '../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// components
import {SalesLayoutComponent} from './components/layout/layout.component';
import {SalesHeaderComponent} from './components/header/header.component';
// Routing Module
import {SalesRoutingModule} from './sales.routing';

// Shared Module
import {MaterialModule} from '../../default.material.module';
import {TranslateModule} from '@ngx-translate/core';


// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {LayoutService} from '../../../../core/admin/sales/layout/layout.service';
import {LayoutSandbox} from '../../../../core/admin/sales/layout/layout.sandbox';
import {LayoutEffects} from '../../../../core/admin/sales/layout/effects/layout.effect';

@NgModule({
    declarations: [
        SalesLayoutComponent,
        SalesHeaderComponent
    ],
    imports: [
        CommonModule,
        SalesRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([LayoutEffects]),
        TranslateModule.forChild()
    ],
    providers: [
        LayoutService,
        LayoutSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class SalesModule {
}
