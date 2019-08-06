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
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../../../../../default.material.module';
import {DefaultCommonModule} from '../../../../../default.common.module';
import {SocialRouting} from './social.routing';
import {SocialEffect} from '../../../../../../../core/admin/settings/siteSettings/social/social-effect/social.effect';
import {SocialService} from '../../../../../../../core/admin/settings/siteSettings/social/social.service';
import {SocialSandbox} from '../../../../../../../core/admin/settings/siteSettings/social/social.sandbox';
import {SocialComponent} from './social.components';


@NgModule({
    declarations: [
        SocialComponent

    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SocialRouting,
        TranslateModule.forChild(),
        EffectsModule.forRoot([SocialEffect])

    ],
    providers: [
        SocialSandbox, SocialService
    ],
    bootstrap: [],
    entryComponents: []
})

export class SocialModule {
}
