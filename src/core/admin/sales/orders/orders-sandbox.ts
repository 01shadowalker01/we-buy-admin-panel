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
import {Store} from '@ngrx/store';
import * as store from './../../../app.state.interface';
import * as orderActions from './orders-action/orders.action';
import {
    getOrderCountFailed,
    getOrderCountLoaded,
    getOrderCountLoading,
    getOrderlist,
    getOrderlistCount,
    getvieworderData,
    getVieworderFailed,
    getVieworderLoaded,
    getVieworderLoading, settingDetail
} from './orders-reducer/orders.selector';
import {OrderslistModel} from './orders-models/orderslist.model';
import {ViewordersModel} from './orders-models/vieworders.model';

@Injectable()
export class OrdersSandbox {


    public getOrderlist$ = this.appState.select(getOrderlist);
    public getOrderlistCount$ = this.appState.select(getOrderlistCount);
    public getvieworderData$ = this.appState.select(getvieworderData);

    public getOrderCountLoaded$ = this.appState.select(getOrderCountLoaded);
    public getOrderCountLoading$ = this.appState.select(getOrderCountLoading);
    public getOrderCountFailed$ = this.appState.select(getOrderCountFailed);

    public getVieworderLoaded$ = this.appState.select(getVieworderLoaded);
    public getVieworderFailed$ = this.appState.select(getVieworderFailed);
    public getVieworderLoading$ = this.appState.select(getVieworderLoading);
    public settingDetail$ = this.appState.select(settingDetail);

    constructor(protected appState: Store<store.AppState>) {
    }

    public getOrderList(value: any) {
        this.appState.dispatch(new orderActions.DoOrderListAction(new OrderslistModel(value)));
    }


    // #pagination

    public getOrderPagination(value: any) {
        this.appState.dispatch(new orderActions.DoOrderCountAction(new OrderslistModel(value)));
    }

    // viewOrderdetails
    public viewOrderdetails(value: any) {
        this.appState.dispatch(new orderActions.DoOrderDetailsAction(new ViewordersModel(value)));
    }

    /*change-order-status*/
    public changeOrderStatus(value: any) {
        this.appState.dispatch(new orderActions.DoOrderChangeStatusAction((value)));
    }
    // getSettings
    public getSettings(): void {
        this.appState.dispatch(new orderActions.GetSettings());
    }

}
