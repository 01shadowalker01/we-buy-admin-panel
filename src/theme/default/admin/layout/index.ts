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

import {AuthLayoutComponent} from './auth/auth.component';
import { CommonLayoutComponent} from './common/common.component';
import {LayoutSandbox} from '../../../../core/admin/layout/layout.sandbox';

import {TranslateModule} from '@ngx-translate/core';
import { ComponentsModule } from '../shared/components';

export const CONTAINERS = {
  AuthLayoutComponent,
  CommonLayoutComponent
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule
  ],
  providers: [LayoutSandbox]
})
export class ContainersModule {
}
