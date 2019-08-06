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
import {ServerModule} from '@angular/platform-server';
import {BrowserModule} from '@angular/platform-browser';
import {AdminModule} from '../theme/default/admin/admin.module';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {AdminComponent} from '../theme/default/admin/admin.component';


@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'spurtcommerce'
        }),
        AdminModule,
        ModuleMapLoaderModule,
        ServerModule,
    ],
    bootstrap: [AdminComponent],
})
export class AppServerModule {
}
