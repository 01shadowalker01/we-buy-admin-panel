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
import {BannerAddComponent} from './add/add.component';
import {BannerListComponent} from './list/list.component';

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {BannerSandbox} from '../../../../../../core/admin/cms/banners/banner.sandbox';
import {BannerService} from '../../../../../../core/admin/cms/banners/banner.service';
import {BannerEffect} from '../../../../../../core/admin/cms/banners/banner-effect/banner.effect';

// Routing Module
import {BannerRoutingModule} from './banner.routing';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CKEditorModule} from 'ng2-ckeditor';
import {HttpLoaderFactory} from '../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        BannerAddComponent,
        BannerListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BannerRoutingModule,
        EffectsModule.forRoot([BannerEffect]),
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
        BannerService,
        BannerSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class BannerModule {
}
