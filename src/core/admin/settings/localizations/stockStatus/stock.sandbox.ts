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
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ToastrManager} from 'ng6-toastr-notifications';
import * as store from '../../../../app.state.interface';
import {
    getNewStock,
    getStockDelete,
    getStockList,
    getstockListCount,
    getstockUpdate,
    StockStatusAddFailed,
    StockStatusAddLoaded,
    StockStatusAddLoading,
    StockStatusCountFailed,
    StockStatusCountLoaded,
    StockStatusCountLoading,
    StockStatusDeleteFailed,
    StockStatusDeleteLoaded,
    StockStatusDeleteLoading,
    StockStatusListFailed,
    StockStatusListLoaded,
    StockStatusListLoading,
    StockStatusUpdateFailed,
    StockStatusUpdateLoaded,
    StockStatusUpdateLoading
} from './stock-reducer/stock.selector';
import * as stockactions from './stock-action/stock.action';
import {StockListForm} from './stock-model/stockstatuslist.model';
import {StockStatusModel} from './stock-model/stockstatus.model';


@Injectable()
export class StockSandbox {
    getStockList$ = this.appState.select(getStockList);
    getNewStock$ = this.appState.select(getNewStock);
    getStockListCount$ = this.appState.select(getstockListCount);
    getstockUpdate$ = this.appState.select(getstockUpdate);
    getStockDelete$ = this.appState.select(getStockDelete);


    public stockStatusListLoading$ = this.appState.select(StockStatusListLoading);
    public stockStatusListLoaded$ = this.appState.select(StockStatusListLoaded);
    public stockStatusListFailed$ = this.appState.select(StockStatusListFailed);

    public stockStatusDeleteLoading$ = this.appState.select(StockStatusDeleteLoading);
    public stockStatusDeleteLoaded$ = this.appState.select(StockStatusDeleteLoaded);
    public stockStatusDeleteFailed$ = this.appState.select(StockStatusDeleteFailed);

    public stockStatusCountLoading$ = this.appState.select(StockStatusCountLoading);
    public stockStatusCountLoaded$ = this.appState.select(StockStatusCountLoaded);
    public stockStatusCountFailed$ = this.appState.select(StockStatusCountFailed);

    public stockStatusAddLoading$ = this.appState.select(StockStatusAddLoading);
    public stockStatusAddLoaded$ = this.appState.select(StockStatusAddLoaded);
    public stockStatusAddFailed$ = this.appState.select(StockStatusAddFailed);

    public stockStatusUpdateLoading$ = this.appState.select(StockStatusUpdateLoading);
    public stockStatusUpdateLoaded$ = this.appState.select(StockStatusUpdateLoaded);
    public stockStatusUpdateFailed$ = this.appState.select(StockStatusUpdateFailed);


    private subscriptions: Array<Subscription> = [];

    constructor(
        protected appState: Store<store.AppState>,
        private toastr: ToastrManager) {
        this.subscribe();
    }

    public showSuccess(msg) {
        this.toastr.successToastr(msg);
    }

    stockStatusList(value: any) {
        this.appState.dispatch(new stockactions.DoStockListAction(new StockListForm(value)));
    }

    addStock(value: any) {
        this.appState.dispatch(new stockactions.DoAddStockAction(new StockStatusModel(value)));
    }

    updateStock(value: any) {
        this.appState.dispatch(new stockactions.DoStockUpdate((value)));
    }

    paginationStockStatusCount(value) {
        this.appState.dispatch(new stockactions.DoStockCount(new StockListForm(value)));
    }

    deleteStockStatus(value) {
        this.appState.dispatch(new stockactions.DoStockDelete(value));
    }

    subscribe() {
        this.getStockList$.subscribe(data => {
        });
    }
}
