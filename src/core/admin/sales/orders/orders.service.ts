/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Api} from '../../providers/api/api';


@Injectable()
export class OrdersService extends Api {
    params: any = {};
    public pagesize: any;
    private url: string = this.getBaseUrl();

    /*SALES --ORDER GET LIST*/
    public getorderlist(params: any): Observable<any> {
        return this.http.get(this.url + '/order/orderlist', {params : params});

    }
    /*SALES --GET ORDER DETAIL*/
    public getorderDetail(params: any): Observable<any> {

        return this.http.get(this.url + '/order/order-detail', {params: params});

    }

    /*change-order-status*/
    changeOrderStatus(param: any): Observable<any> {
        return this.http.post(this.url + '/order/order-change-status', param);

    }
    /*SALES --GET SETTINGS*/
    public getsettings(): Observable<any> {
        return this.http.get(this.url + '/settings/get-settings');
    }

}
