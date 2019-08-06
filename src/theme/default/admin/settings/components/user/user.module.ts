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
import {UserAddComponent} from './add/add.component';
import {UserListComponent} from './list/list.component';

// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {UserEffect} from '../../../../../../core/admin/settings/user/user-effect/user.effect';
import {UserService} from '../../../../../../core/admin/settings/user/user.service';
import {UserSandbox} from '../../../../../../core/admin/settings/user/user.sandbox';

// Routing Module
import {UserRoutingModule} from './user.routing';

// Shared Module
import {MaterialModule} from '../../../../default.material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../../admin.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
    declarations: [
        UserAddComponent,
        UserListComponent,
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UserRoutingModule,
        EffectsModule.forRoot([UserEffect]),
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
    providers: [
        UserService,
        UserSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class UserModule {
}
