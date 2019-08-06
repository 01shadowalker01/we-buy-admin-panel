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
import {MediaComponent} from './media.component';

// Store Actions
import {MediaService} from '../../../../../../core/admin/catalog/media/media.service';
import {MediaSandbox} from '../../../../../../core/admin/catalog/media/media.sandbox';
import {MediaEffects} from '../../../../../../core/admin/catalog/media/effects/media.effect';
import {EffectsModule} from '@ngrx/effects';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
// Routing Module
import {MediaRouting} from './media.routing';

@NgModule({
    declarations: [
        MediaComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([MediaEffects]),
        MediaRouting
    ],
    providers: [MediaService, MediaSandbox],
    bootstrap: [],
    exports: [
        MediaComponent
    ],
    entryComponents: [
        MediaComponent
    ]
})

export class MediaModule {
}
