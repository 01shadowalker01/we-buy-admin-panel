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
import {DefaultCommonModule} from '../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import {SettingsLayoutComponent} from './components/layout/layout.component';
// Routing Module
import {SettingsRoutingModule} from './settings.routing';

// Services and Sandbox
import {CountryService} from '../../../../core/admin/settings/localizations/country/country.service';
import {CurrencySandbox} from '../../../../core/admin/settings/localizations/currency/currency.sandbox';
import {CurrencyService} from '../../../../core/admin/settings/localizations/currency/currency.service';
import {ZoneService} from '../../../../core/admin/settings/localizations/zone/zone.service';
import {ZoneSandbox} from '../../../../core/admin/settings/localizations/zone/zone.sandbox';
import {LanguagesSandbox} from '../../../../core/admin/settings/localizations/languages/languages.sandbox';
import {LanguagesService} from '../../../../core/admin/settings/localizations/languages/languages.service';

// Shared Module
import {MaterialModule} from '../../default.material.module';
import {TranslateModule} from '@ngx-translate/core';
import {EffectsModule} from '@ngrx/effects';
import {CountryEffect} from '../../../../core/admin/settings/localizations/country/country-effect/country.effect';
import {ZoneEffect} from '../../../../core/admin/settings/localizations/zone/zone-effect/zone.effect';
import {LanguagesEffect} from '../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';
import {CurrencyEffect} from '../../../../core/admin/settings/localizations/currency/currency-effect/currency.effects';
import {CountrySandbox} from '../../../../core/admin/settings/localizations/country/country.sandbox';

@NgModule({
    declarations: [
        SettingsLayoutComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([CountryEffect, CurrencyEffect, LanguagesEffect, ZoneEffect]),
        TranslateModule.forChild()
    ],
    providers: [
        CountryService, CountrySandbox,
        CurrencySandbox, CurrencyService,
        ZoneService, ZoneSandbox, LanguagesSandbox, LanguagesService],
    bootstrap: [],
    entryComponents: [],
})

export class SettingsModule {
}
