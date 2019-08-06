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
import {CatalogLayoutComponent} from './components/layout/layout.component';
import {CatalogHeaderComponent} from './components/header/header.component';
// Routing Module
import {CatalogRoutingModule} from './catalog.routing';
// Shared Module
import {MaterialModule} from '../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CKEditorModule} from 'ng2-ckeditor';
// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {BrandApiClient} from '../../../../core/admin/catalog/brand/brandApiClientservice';
import {BrandSandbox} from '../../../../core/admin/catalog/brand/brand.sandbox';
import {BrandEffects} from '../../../../core/admin/catalog/brand/effects/brand.effect';
import {LayoutService} from '../../../../core/admin/catalog/layout/layout.service';
import {LayoutSandbox} from '../../../../core/admin/catalog/layout/layout.sandbox';
import {LayoutEffects} from '../../../../core/admin/catalog/layout/effects/layout.effect';
import {CategoriesEffect} from '../../../../core/admin/catalog/category/effects/categories.effect';
import {CategoriesService} from '../../../../core/admin/catalog/category/categories.service';
import {HttpLoaderFactory} from '../admin.module';
import {HttpClient} from '@angular/common/http';

@NgModule({
    declarations: [
        CatalogLayoutComponent,
        CatalogHeaderComponent
    ],
    imports: [
        CommonModule,
        CatalogRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([LayoutEffects, CategoriesEffect, BrandEffects]),
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
        LayoutService,
        LayoutSandbox,
        BrandApiClient,
        BrandSandbox,
        CategoriesService
    ],
    bootstrap: [],
    entryComponents: []
})

export class CatalogModule {
}
