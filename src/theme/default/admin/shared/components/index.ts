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
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {DefaultCommonModule} from '../../../default.common.module';

// custom directive component
import {NavigationComponent} from './navigation/navigation.component';
import {ProfileBarComponent} from './profile-bar/profile.bar.component';
import {MaterialModule} from '../../../default.material.module';
import {TranslateModule} from '@ngx-translate/core';

export const COMPONENTS = [
  NavigationComponent,
  ProfileBarComponent
];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DefaultCommonModule,
    MaterialModule,
    TranslateModule.forChild()

  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [
  ],
  providers: []
})
export class ComponentsModule {
}
