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
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as actions from '../banner-action/banner.action';
import {catchError} from 'rxjs/internal/operators';
import {BannerService} from '../banner.service';
import {BannercountResponseModel} from '../banner-model/bannercount.response.model';


@Injectable()
export class BannerEffect {

    constructor(private action$: Actions, private service: BannerService) {
    }

    // Banner List
    @Effect()
    doBannerLists$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_BANNER_LIST),
            map((action: actions.DoBannerListAction) => action.payload),
            switchMap((state) => {
                return this.service.bannerList(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoBannerListSuccessAction((user)),
                        ]),
                        catchError(error => of(new actions.DoBannerListFailAction(error)))
                    );
            })
        );


    // Banner LIST PAGINATION
    @Effect()
    doBannerPagination$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_BANNER_PAGINATION_ACTION),
            map((action: actions.DoBannerPaginationAction) => action.payload),
            switchMap((state) => {
                return this.service.bannerPagiantion(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoBannerPaginationSuccessAction(new BannercountResponseModel(user)),
                        ]),
                        catchError(error => of(new actions.DoBannerPaginationFailAction(error)))
                    );
            })
        );

    // ADD BANNER
    @Effect()
    doAddBanner$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_BANNER_ACTION),
            map((action: actions.DoBannerAddAction) => action.payload),
            switchMap((state) => {
                return this.service.addBanner(state)
                    .pipe(
                        map((analysis) => new actions.DoBannerAddSuccessAction((analysis))),
                        catchError(error => of(new actions.DoBannerAddSuccessAction(error)))
                    );
            })
        );

    // Update
    @Effect()
    doUpdateBanner$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_UPDATE_BANNER_ACTION),
            map((action: actions.DoBannerUpdateAction) => action.payload),
            switchMap((state) => {
                const Id = state.bannerId;
                if (state.image === '') {
                    delete state.image;
                }
                return this.service.updateBanner(state, Id)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoBannerUpdateSuccessAction((user)),
                        ]),
                        catchError(error => of(new actions.DoBannerUpdateFailAction(error)))
                    );
            })
        );

    // // Delete
    @Effect()
    doDeleteBanner$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_DELETE_BANNER_ACTION),
            map((action: actions.DoBannerDeleteAction) => action.payload),
            switchMap((state) => {
                const bannerId = state.bannerId;
                return this.service.deleteBanner(state, bannerId)
                    .pipe(
                        map((update) => new actions.DoBannerDeleteSuccessAction((update))),
                        catchError(error => of(new actions.DoBannerDeleteFailAction(error)))
                    );
            })
        );


}
