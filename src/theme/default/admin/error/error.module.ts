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
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {ErrorRoutingModule} from './error-routing.module';
import {NotfoundComponent} from './404/not-found.component';
import {ServerErrorComponent} from './500/server.error.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  declarations: [
    NotfoundComponent,
    ServerErrorComponent
  ],
  providers: []
})
export class ErrorModule {
}
