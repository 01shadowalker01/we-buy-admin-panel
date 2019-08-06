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

// components

// Store Actions
import {EffectsModule} from '@ngrx/effects';

// Routing Module

// Shared Module
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../../../../default.material.module';
import {DefaultCommonModule} from '../../../../../default.common.module';
import {PersonalizeProductComponent} from './personalize-product.component';
import {PersonalizeProductRouting} from './personalize-product.routing';
import {PerSonalizeProductService} from '../../../../../../../core/admin/settings/personalize/product/product-service';
import {PersonalizeProductSandbox} from '../../../../../../../core/admin/settings/personalize/product/product-sandbox';
import {PersonalizeProductEffect} from '../../../../../../../core/admin/settings/personalize/product/product-effects/product-effect';
import {HttpLoaderFactory} from '../../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        PersonalizeProductComponent

    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        PersonalizeProductRouting,
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        EffectsModule.forRoot([PersonalizeProductEffect])
    ],
    providers: [
        PersonalizeProductSandbox, PerSonalizeProductService
    ],
    bootstrap: [],
    entryComponents: []
})

export class PersonalizeProductModule {
}
