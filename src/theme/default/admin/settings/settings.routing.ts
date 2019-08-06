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
import {SettingsLayoutComponent} from './components/layout/layout.component';

const settingsRoutes: Routes = [
    {path: '', redirectTo: 'user', pathMatch: 'full'},
    {
        path: '',
        component: SettingsLayoutComponent,
        children: [
          // ---
          {
            path: 'user',
            loadChildren: './components/user/user.module#UserModule'
          },
          {
            path: 'role',
            loadChildren: './components/role/role.module#RoleModule'
          },
          {
            path: 'language',
            loadChildren: './components/localizations/languages/languages.module#LanguagesModule'
          },
          {
            path: 'stock-status',
            loadChildren: './components/localizations/stockstatus/stockstatus.module#StockStatusModule'
          },
          {
            path: 'order-status',
            loadChildren: './components/localizations/orderstatus/orderstatus.module#OrderStatusModule'
          },
          {
            path: 'countries',
            loadChildren: './components/localizations/countries/countries.module#CountriesModule'
          },
          {
            path: 'zone',
            loadChildren: './components/localizations/zone/zone.module#ZoneModule'
          },
          {
            path: 'currency',
            loadChildren: './components/localizations/currencies/currency.module#CurrencyModule'
          },
          {
            path: 'emailtemp',
            loadChildren: './components/localizations/emailtemplate/emailtemplate.module#EmailTemplateModule'
          },
          {
            path: 'generalsetting',
            loadChildren: './components/generalsettings/generalsettings.module#GeneralSettingsModule'
          },
          {
            path: 'seo',
            loadChildren: './components/sitesettings/seo/seo.module#SeoModule'
          },
          {
            path: 'appearance',
            loadChildren: './components/sitesettings/appearence/appearence.module#AppearenceModule'
          },
          {
            path: 'social',
            loadChildren: './components/sitesettings/social/social.module#SocialModule'
          },
          {
            path: 'personalizeproduct',
            loadChildren: './components/personalize/product/personalize-product.module#PersonalizeProductModule'
          },
          {
            path: 'personalizeorder',
            loadChildren: './components/personalize/order/personalize-order.module#PersonalizeOrderModule'
          }

        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(settingsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SettingsRoutingModule {
}
