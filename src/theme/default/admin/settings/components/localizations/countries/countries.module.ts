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
import {CountriesAddComponent} from './add/add.component';
import {CountriesListComponent} from './list/list.component';

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {CountryService} from '../../../../../../../core/admin/settings/localizations/country/country.service';
import {CountrySandbox} from '../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import {CountryEffect} from '../../../../../../../core/admin/settings/localizations/country/country-effect/country.effect';

// Routing Module
import {CountriesRoutingModule} from './countries.routing';

// Shared Module
import {MaterialModule} from '../../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        CountriesAddComponent,
        CountriesListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CountriesRoutingModule,
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
    providers: [],
    bootstrap: [],
    entryComponents: []
})

export class CountriesModule {
}
