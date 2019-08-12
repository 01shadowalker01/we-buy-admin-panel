/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { PersianCurrencyPipe } from '../../core/admin/shared/pipes/persian-currency.pipe';


@NgModule({
    declarations: [PersianCurrencyPipe],
    imports: [
        NgbModule,
        SelectDropDownModule,
        NgxChartsModule        
    ],
    exports: [
        NgbModule,
        SelectDropDownModule,
        NgxChartsModule,
        PersianCurrencyPipe
    ],
    providers: [],
})

export class DefaultCommonModule {
}
