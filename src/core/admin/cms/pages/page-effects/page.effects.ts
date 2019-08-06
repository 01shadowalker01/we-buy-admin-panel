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
import * as actions from '../pagesaction/page.action';
import {catchError} from 'rxjs/internal/operators';
import {PagesApiclientService} from '../pages.ApiclientService';
import {PagesupdateResponseModel} from '../pages-model/pagesupdate.response.model';
import {PagescountResponseModel} from '../pages-model/pagescount.response.model';


@Injectable()
export class PageEffects {

    constructor(private action$: Actions, private apiCli: PagesApiclientService) {
    }

    // PAGES LIST EFFECT
    @Effect()
    doPagesList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PAGES_LIST_ACTION),
            map((action: actions.DoPagesListAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.getpageslist(state)
                    .pipe(
                        switchMap((pages) => [
                            new actions.DoPagesSuccessAction((pages)),
                        ]),
                        catchError(error => of(new actions.DoPagesFailAction(error)))
                    );
            })
        );

    // PAGES  COUNT LIST EFFECT
    @Effect()
    doPagesCountList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PAGES_COUNT_LIST_ACTION),
            map((action: actions.DoPagescountListAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.getpageslist(state)
                    .pipe(
                        switchMap((pagesCount) => [
                            new actions.DoPagescountSuccessAction(new PagescountResponseModel(pagesCount)),
                        ]),
                        catchError(error => of(new actions.DoPagescountFailAction(error)))
                    );
            })
        );
    // add - pages
    @Effect()
    doAddPagesList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_PAGES_LIST),
            map((action: actions.DoAddPagesAction) => action.payload),
            switchMap((state) => {
                return this.apiCli.Addpages(state)
                    .pipe(
                        map((analysis) => new actions.DoAddPagesSuccessAction(analysis)),
                        catchError(error => of(new actions.DoAddPagesFailAction(error)))
                    );
            })
        );
    // update - pages
    @Effect()
    doUpdatePagesList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_UPDATE_PAGES_LIST),
            map((action: actions.DoUpdatepagesAction) => action.payload),
            switchMap((state) => {
                const pageId = state.pageId;
                return this.apiCli.updatepages(state, pageId)
                    .pipe(
                        map((analysis) => new actions.DoUpdatepagesSuccessAction(new PagesupdateResponseModel(analysis))),
                        catchError(error => of(new actions.DoUpdatepagesFailAction(error)))
                    );
            })
        );
    @Effect()
    doPagesDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PAGES_DELETE),
            map((action: actions.DoPagesDeleteAction) => action.payload),
            switchMap((state) => {
                const pageId = state.pageId;

                return this.apiCli.deletepageslist(state, pageId)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoPagesDeleteSuccessAction((user)),
                        ]),
                        catchError(error => of(new actions.DoPagesDeleteFailAction((error))))
                    );
            })
        );
}
