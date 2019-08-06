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
// effects
import {Effect, Actions, ofType} from '@ngrx/effects';
// store
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
// actions
import * as actions from '../product-action/product.action';
import {catchError} from 'rxjs/internal/operators';
// service
import {ProductService} from '../product.service';
import {ToastrManager} from 'ng6-toastr-notifications';


@Injectable()
export class ProductEffect {
    constructor(private action$: Actions, private service: ProductService) {
    }


    // Product list
    @Effect()
    doprodlists$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_PRODUCT_LIST),
            map((action: actions.GetProductlistAction) => action.payload),
            switchMap((state) => {
                return this.service.productList(state)
                    .pipe(
                        switchMap((product) => [
                            new actions.GetProductlistSuccessAction(product),
                        ]),
                        catchError(error => of(new actions.GetProductlistFailAction(error)))
                    );
            })
        );
    // Product list count
    @Effect()
    doprodlistscount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
            map((action: actions.GetProductCountAction) => action.payload),
            switchMap((state) => {
                return this.service.productCount(state)
                    .pipe(
                        map((count) => new actions.GetProductCountSuccessAction(count)),
                        catchError(error => of(new actions.GetProductCountFailAction(error)))
                    );
            })
        );
    // Product delete
    @Effect()
    doProductDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
            map((action: actions.DoProductDeleteAction) => action.payload),
            switchMap((state) => {
                return this.service.productDelete(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoProductDeleteSuccessAction(user),
                        ]),
                        catchError(error => of(new actions.DoProductDeleteFailAction(error)))
                    );
            })
        );
    // Product add
    @Effect()
    doProductAdd$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PRODUCT_ADD),
            map((action: actions.DoProductAddAction) => action.payload),
            switchMap((state) => {
                return this.service.productAdd(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoProductAddSuccessAction(user),
                        ]),
                        catchError(error => of(new actions.DoProductAddFailAction(error)))
                    );
            })
        );
    // Product update
    @Effect()
    doProductUpdate$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
            map((action: actions.DoProductUpdateAction) => action.payload),
            switchMap((state) => {
                return this.service.productUpdate(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoProductUpdateSuccessAction(user),
                        ]),
                        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
                    );
            })
        );
    // Product detail
    @Effect()
    doDetail$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
            map((action: actions.GetProductDetailAction) => action.payload),
            switchMap((state) => {
                return this.service.productDetail(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.GetProductDetailSuccess(user),
                        ]),
                        catchError(error => of(new actions.GetProductDetailFail(error)))
                    );
            })
        );


    // IS Feature

    @Effect()
    doProductIsFeature$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_IS_FEATURE_DETAIL),
            map((action: actions.DoProductDetailIsFeatureAction) => action.payload),
            switchMap((state) => {
                return this.service.productIsfeature(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoProductDetailIsFeatureSuccess(user),
                        ]),
                        catchError(error => of(new actions.DoProductDetailIsFeatureFail(error)))
                    );
            })
        );

    // Product Today Deals
    @Effect()
    doProductTodayDeals$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_TODAY_DEALS_DETAIL),
            map((action: actions.DoProductTodayDealAction) => action.payload),
            switchMap((state) => {
                return this.service.productTodayDeals(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoProductTodayDealSuccess(user),
                        ]),
                        catchError(error => of(new actions.DoProductTodayDealFail(error)))
                    );
            })
        );


}
