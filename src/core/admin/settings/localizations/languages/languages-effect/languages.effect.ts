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
import {catchError} from 'rxjs/internal/operators';
import * as actions from '../languages-action/languages.action';
import {LanguagesService} from '../languages.service';

@Injectable()
export class LanguagesEffect {
    constructor(private action$: Actions, private service: LanguagesService) {
    }

    // Language LIST
    @Effect()
    doLanguagelists$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_LANG_LIST),
            map((action: actions.DoLanguageListAction) => action.payload),
            switchMap((state) => {
                return this.service.Languageslist(state)
                    .pipe(
                        switchMap((language) => [
                            new actions.DoLanguageListSuccessAction(language),
                        ]),
                        catchError(error => of(new actions.DoLanguageListFailAction(error)))
                    );
            })
        );
    // Language ADD
    @Effect()
    doLanguageAdds$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_LANG_ACTION),
            map((action: actions.DoAddLanguageAction) => action.payload),
            switchMap((state) => {
                return this.service.ADDLanguage(state)
                    .pipe(
                        switchMap((language) => [
                            new actions.DoAddLanguageSuccessAction(language),
                        ]),
                        catchError(error => of(new actions.DoAddLanguageFailAction(error)))
                    );
            })
        );
    // Language Update
    @Effect()
    doLanguageUpdate$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_UPDATE_LANG_ACTION),
            map((action: actions.DoUpdateLanguageAction) => action.payload),
            switchMap((state) => {
                const languageId = state.languageId;
                return this.service.UpdateLanguage(state, languageId)
                    .pipe(
                        switchMap((language) => [
                            new actions.DoUpdateLanguageSuccessAction(language),
                        ]),
                        catchError(error => of(new actions.DoUpdateLanguageFailAction(error)))
                    );
            })
        );
    // Language Delete
    @Effect()
    doLanguageDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_DELETE_LANG_ACTION),
            map((action: actions.DoDeleteLanguageAction) => action.payload),
            switchMap((state) => {
                const languageId = state.languageId;
                return this.service.DeleteLanguage(state, languageId)
                    .pipe(
                        switchMap((language) => [
                            new actions.DoDeleteLanguageSuccessAction(language),
                        ]),
                        catchError(error => of(new actions.DoDeleteLanguageFailAction(error)))
                    );
            })
        );
    // Language LIST
    @Effect()
    doLanguagelistspagination$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_LANG_LIST_PAGIATION),
            map((action: actions.DoLanguagePaginationAction) => action.payload),
            switchMap((state) => {
                return this.service.Languageslistpagination(state)
                    .pipe(
                        switchMap((language) => [
                            new actions.DoLanguagePaginationSuccessAction(language),
                        ]),
                        catchError(error => of(new actions.DoLanguagePaginationFailAction(error)))
                    );
            })
        );


}
