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
import {BrandAddComponent} from './add/add.component';
import {BrandListComponent} from './list/list.component';

// Routing Module
import {BrandRoutingModule} from './brand.routing';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NumberAcceptModule} from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import {HttpLoaderFactory} from '../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        BrandAddComponent,
        BrandListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrandRoutingModule,
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        NumberAcceptModule
    ],
    providers: [],
    bootstrap: [],
    entryComponents: []
})

export class BrandModule {
}
