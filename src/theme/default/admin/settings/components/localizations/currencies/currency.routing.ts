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
    RouterModule,
    Routes
} from '@angular/router';

// Component
import {CurrencyListComponent} from './list/list.component';
import {CurrencyAddComponent} from './add/add.component';


const currencyRoutes: Routes = [
    {path: '', component: CurrencyListComponent},
    {path: 'add', component: CurrencyAddComponent},
    {
        path: 'edit/:id',
        component: CurrencyAddComponent
    }

];


@NgModule({
    imports: [
        RouterModule.forChild(currencyRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CurrencyRoutingModule {
}







