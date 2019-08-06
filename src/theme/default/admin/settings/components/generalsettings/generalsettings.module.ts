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

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {GeneralSettingEffect} from '../../../../../../core/admin/settings/generalsetting/generalsetting-effect/generalsetting.effect';
// Component
import {GeneralSettingComponent} from './generalsettings/generalsettings.component';

// Routing Module
import {GenaeralSettingsRoutingModule} from './generalsettings.routing';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// Service And Sandbox
import {GeneralSettingSandbox} from '../../../../../../core/admin/settings/generalsetting/generalsetting.sandbox';
import {GeneralSettingService} from '../../../../../../core/admin/settings/generalsetting/generalsetting.service';
import {CKEditorModule} from 'ng2-ckeditor';
import {HttpLoaderFactory} from '../../../admin.module';
import {HttpClient} from '@angular/common/http';

@NgModule({
    declarations: [
        GeneralSettingComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        GenaeralSettingsRoutingModule,
        EffectsModule.forRoot([GeneralSettingEffect]),
        TranslateModule.forChild(
            {
                loader: {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient]
                }
            }
        ),
        CKEditorModule
    ],
    providers: [
        GeneralSettingSandbox, GeneralSettingService

    ],
    bootstrap: [],
    entryComponents: []
})

export class GeneralSettingsModule {
}
