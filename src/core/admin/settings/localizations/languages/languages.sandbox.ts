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
import {ToastrManager} from 'ng6-toastr-notifications';
import * as languagesActions from './languages-action/languages.action';
import {Subscription} from 'rxjs/index';
import * as store from './../../../../app.state.interface';
import {Router} from '@angular/router';
import {
    getlanguagelist, languageListLoading, languageListLoaded, languageListFailed, languageDeleteLoading, languageDeleteLoaded,
    languageCountLoading, languageCountFailed, languageCountLoaded, languageAddLoaded, languageAddFailed,
    languageAddLoading, languageUpdateLoading, languageUpdateLoaded, languageUpdateFailed, languageDeleteFailed
} from './languages-reducer/languages.seletor';
import {getlanguaUpdate} from './languages-reducer/languages.seletor';
import {getlanguaPagination} from './languages-reducer/languages.seletor';
import {getlanguaAdd} from './languages-reducer/languages.seletor';
import {getlanguaDelete} from './languages-reducer/languages.seletor';
import {LanguageForm} from './languages-model/languages.model';

import {LanguageListForm} from './languages-model/languages-list.model';


@Injectable()
export class LanguagesSandbox {

    public getlanguagelist$ = this.appState.select(getlanguagelist);
    public getlanguageUpdate$ = this.appState.select(getlanguaUpdate);
    public getlanguagePageLength$ = this.appState.select(getlanguaPagination);
    public getlanguageAdd$ = this.appState.select(getlanguaAdd);
    public getlanguageDelete$ = this.appState.select(getlanguaDelete);

    public languageListLoading$ = this.appState.select(languageListLoading);
    public languageListLoaded$ = this.appState.select(languageListLoaded);
    public languageListFailed$ = this.appState.select(languageListFailed);

    public languageDeleteLoading$ = this.appState.select(languageDeleteLoading);
    public languageDeleteLoaded$ = this.appState.select(languageDeleteLoaded);
    public languageDeleteFailed$ = this.appState.select(languageDeleteFailed);

    public languageCountLoading$ = this.appState.select(languageCountLoading);
    public languageCountLoaded$ = this.appState.select(languageCountLoaded);
    public languageCountFailed$ = this.appState.select(languageCountFailed);

    public languageAddLoading$ = this.appState.select(languageAddLoading);
    public languageAddLoaded$ = this.appState.select(languageAddLoaded);
    public languageAddFailed$ = this.appState.select(languageAddFailed);

    public languageUpdateLoading$ = this.appState.select(languageUpdateLoading);
    public languageUpdateLoaded$ = this.appState.select(languageUpdateLoaded);
    public languageUpdateFailed$ = this.appState.select(languageUpdateFailed);


    private subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>, private router: Router, private toastr: ToastrManager) {
        this.subscribe();
    }

    // ToastrManager Notification
    public showSuccess(msg) {
        this.toastr.successToastr(msg, 'Success!');
    }

    public showFailed(msg) {
        this.toastr.errorToastr(msg, 'Failed!');
    }


    public languageList(value) {
        this.appState.dispatch(new languagesActions.DoLanguageListAction(new LanguageListForm(value)));
    }

    public AddLanguage(value) {
        this.appState.dispatch(new languagesActions.DoAddLanguageAction(new LanguageForm(value)));
    }

    public UpdateLanguage(value) {
        this.appState.dispatch(new languagesActions.DoUpdateLanguageAction(new LanguageForm(value)));
    }

    public deleteLanguage(value) {
        this.appState.dispatch(new languagesActions.DoDeleteLanguageAction(value));
    }

    public languageListPagination(value) {
        this.appState.dispatch(new languagesActions.DoLanguagePaginationAction(new LanguageListForm(value)));
    }

    subscribe() {
        this.subscriptions.push(this.getlanguageUpdate$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/settings/language']);
            }
        }));
        this.subscriptions.push(this.getlanguageAdd$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/settings/language']);
            }
        }));
        this.subscriptions.push(this.getlanguageDelete$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/settings/language']);
            }
        }));


    }

}













