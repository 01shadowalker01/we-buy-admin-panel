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
import {catchError, tap} from 'rxjs/internal/operators';
import * as actions from '../generalsetting-action/generalsetting.action';
import {GeneralSettingService} from '../generalsetting.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class GeneralSettingEffect {


    constructor(private action$: Actions,
                private service: GeneralSettingService,
                private translate: TranslateService) {
    }

    // NEW USER
    @Effect()
    doAddUser$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_NEW_GENERAL_SETTINGS),
            map((action: actions.DoNewGeneralSettingAction) => action.payload),
            switchMap((state) => {
                return this.service.createGeneralSetting(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoNewGeneralSettingSuccessAction(user),
                        ]),
                        tap(val => {
                            if (val.payload.data.storeLanguageName === 'Hindi') {
                                localStorage.setItem('defaultlanguage', 'hi');
                                this.translate.use('hi');
                                this.translate.reloadLang('hi');
                            } else {
                                localStorage.setItem('defaultlanguage', 'en');
                                this.translate.use('en');
                                this.translate.reloadLang('en');


                            }
                        }),
                        catchError(error => of(new actions.DoNewGeneralSettingFailAction(error)))
                    );
            })
        );

    // GET GENERAL SETTINGS
    @Effect()
    dogetGeneralsetting$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_GET_GENERAL_SETTINGS),
            map((action: actions.DoGetGeneralSettingAction) => action.payload),
            switchMap(() => {
                return this.service.getGeneralSetting()
                    .pipe(
                        switchMap((user) => {
                            return [
                                new actions.DoGetGeneralSettingSuccessAction((user)),
                            ];
                        }),
                        catchError(error => of(new actions.DoGetGeneralSettingFailAction()))
                    );
            })
        );


}
