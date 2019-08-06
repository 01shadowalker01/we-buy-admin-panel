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
import {LanguageAddComponent} from './add/add.component';
import {LanguageListComponent} from './list/list.component';

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {LanguagesEffect} from '../../../../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';
import {LanguagesSandbox} from '../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import {LanguagesService} from '../../../../../../../core/admin/settings/localizations/languages/languages.service';

// Routing Module
import {LanguagesRoutingModule} from './languages.routing';

// Shared Module
import {MaterialModule} from '../../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        LanguageAddComponent,
        LanguageListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        LanguagesRoutingModule,
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

export class LanguagesModule {
}
