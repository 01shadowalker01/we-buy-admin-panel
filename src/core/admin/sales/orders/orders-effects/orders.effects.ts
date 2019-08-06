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
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as actions from '../orders-action/orders.action';
import {catchError} from 'rxjs/internal/operators';
import {OrdersService} from '../orders.service';

@Injectable()
export class OrdersEffects {

    constructor(private action$: Actions, private apiCli: OrdersService) {
    }

    @Effect()

    doOrderlists$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ORDER_LIST_ACTION),
            map((action: actions.DoOrderListAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.getorderlist(state)
                    .pipe(
                        switchMap((salesorders) => [
                            new actions.DoOrderSuccessAction(salesorders),
                        ]),
                        catchError(error => of(new actions.DoOrderListFailAction(error)))
                    );
            })
        );
    @Effect()

    doOrderCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ORDER_COUNT_ACTION),
            map((action: actions.DoOrderCountAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.getorderlist(state)
                    .pipe(
                        switchMap((salesorders) => [
                            new actions.DoOrderCountSuccessAction((salesorders)),
                        ]),
                        catchError(error => of(new actions.DoOrderCountFailAction(error)))
                    );
            })
        );
    @Effect()

    doOrderDetails$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ORDER_DETAIL_ACTION),
            map((action: actions.DoOrderDetailsAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.getorderDetail(state)
                    .pipe(
                        switchMap((orderDetails) => [
                            new actions.DoOrderDetailsSuccessAction(orderDetails),
                        ]),
                        catchError(error => of(new actions.DoOrderDetailsFailAction(error)))
                    );
            })
        );

    // Order Status Change
    @Effect()
    doOrderStatusChange$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ORDER_CHANGE_STATUS_ACTION),
            map((action: actions.DoOrderChangeStatusAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.changeOrderStatus(state)
                    .pipe(
                        switchMap((orderDetails) => [
                            new actions.DoOrderChangeStatusSuccess((orderDetails)),
                        ]),
                        catchError(error => of(new actions.DoOrderChangeStatusFail(error)))
                    );
            })
        );
    @Effect()
    getSettings$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
            map((action: actions.GetSettings) => action.payload),
            switchMap((state) => {
                return this.apiCli.getsettings()
                    .pipe(
                        map((featured) => new actions.GetSettingsSuccess(featured)),
                        catchError(error => of(new actions.GetSettingsFail(error)))
                    );
            })
        );

}
