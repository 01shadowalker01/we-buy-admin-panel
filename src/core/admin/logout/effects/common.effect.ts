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
import * as actions from '../action/common.action';

import {catchError} from 'rxjs/internal/operators';

import {AppApiClient} from '../../../appApiClient.service';
import {LogoutResponseModel} from '../models/logout.response.model';


@Injectable()
export class CommonEffect {

    constructor(private action$: Actions, private apiCli: AppApiClient) {
    }

    // LOGOUT
    @Effect()
    dologoutCategory$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_LOGOUT),
            map((action: actions.DoLogoutAction) => action.payload),
            switchMap(() => {
                return this.apiCli.logoutapi()
                    .pipe(
                        switchMap((user) => {
                            return [
                                new actions.DoLogoutSuccessAction(new LogoutResponseModel(user)),
                            ];
                        }),
                        catchError(error => of(new actions.DoLogoutFailAction(error)))
                    );
            })
        );

}
