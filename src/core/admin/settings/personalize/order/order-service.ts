/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OrderModel} from './order-model/order-model';
import {Api} from '../../../providers/api/api';


@Injectable()
export class PerSonalizeOrderService extends Api {
    private url = this.getBaseUrl();


    // new Order
    createOrder(param: OrderModel): Observable<any> {
        return this.http.post(this.url + '/settings/create-settings', param);

    }
     // get Order
    getOrder(): Observable<any> {
        return this.http.get(this.url + '/settings/get-settings');

    }

}
