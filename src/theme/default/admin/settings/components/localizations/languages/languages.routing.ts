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
import {LanguageAddComponent} from './add/add.component';
import {LanguageListComponent} from './list/list.component';

const languageRoutes: Routes = [
    {path: '', component: LanguageListComponent},
    {path: 'add', component: LanguageAddComponent},
    {
        path: 'edit/:id',
        component: LanguageAddComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(languageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LanguagesRoutingModule {
}
