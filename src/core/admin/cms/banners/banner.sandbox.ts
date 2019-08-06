/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {ToastrManager} from 'ng6-toastr-notifications';
import * as bannerActions from '../banners/banner-action/banner.action';
import {Subscription} from 'rxjs/index';
import * as store from '../../../app.state.interface';
import {Router} from '@angular/router';
import {
    getaddBanner,
    getbanneraddfailed,
    getbanneraddloaded,
    getbanneraddloading,
    getbannercountfailed,
    getbannercountloaded,
    getbannercountloading,
    getbannerdeletefailed,
    getbannerdeleteloaded,
    getbannerdeleteloading,
    getbannerlistfailed,
    getbannerlistloaded,
    getbannerlistloading,
    getBannerlst,
    getbannerpagination,
    getbannerupdatefailed,
    getbannerupdateloaded,
    getbannerupdateloading,
    getdeletebanner,
    getUpdatebanner
} from './banner-reducer/banner.selector';
import {getAddBanners} from './banner-reducer/banner.selector';
import {BannerlistModel} from './banner-model/bannerlist.model';
import {BannerdeleteModel} from './banner-model/bannerdelete.model';
import {BannercountModel} from './banner-model/bannercount.model';


@Injectable()
export class BannerSandbox implements OnDestroy {

    public getbannerlist$ = this.appState.select(getBannerlst);
    public getbannerpagelength$ = this.appState.select(getbannerpagination);
    public getAddNewBanner$ = this.appState.select(getAddBanners);
    public getaddBanner$ = this.appState.select(getaddBanner);
    public getUpdatebanner$ = this.appState.select(getUpdatebanner);
    public getdeletebanner$ = this.appState.select(getdeletebanner);
    public getbanneraddloaded$ = this.appState.select(getbanneraddloaded);
    public getbanneraddfailed$ = this.appState.select(getbanneraddfailed);
    public getbanneraddloading$ = this.appState.select(getbanneraddloading);
    public getbannerupdateloading$ = this.appState.select(getbannerupdateloading);
    public getbannerupdateloaded$ = this.appState.select(getbannerupdateloaded);
    public getbannerupdatefailed$ = this.appState.select(getbannerupdatefailed);
    public getbannerdeleteloading$ = this.appState.select(getbannerdeleteloading);
    public getbannerdeleteloaded$ = this.appState.select(getbannerdeleteloaded);
    public getbannerdeletefailed$ = this.appState.select(getbannerdeletefailed);
    public getbannercountloading$ = this.appState.select(getbannercountloading);
    public getbannercountloaded$ = this.appState.select(getbannercountloaded);
    public getbannercountfailed$ = this.appState.select(getbannercountfailed);
    public getbannerlistloaded$ = this.appState.select(getbannerlistloaded);
    public getbannerlistfailed$ = this.appState.select(getbannerlistfailed);
    public getbannerlistloading$ = this.appState.select(getbannerlistloading);


    private subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>, private router: Router, private toastr: ToastrManager) {

        this.subscribe();
    }

    public getBannerList(value: any) {
        this.appState.dispatch(new bannerActions.DoBannerListAction(new BannerlistModel(value)));
    }

    public getBannerPagination(value: any) {
        this.appState.dispatch(new bannerActions.DoBannerPaginationAction(new BannercountModel(value)));
    }

    public addBanner(data) {
        this.appState.dispatch(new bannerActions.DoBannerAddAction((data)));

    }

    public UpdateBanner(data) {
        this.appState.dispatch(new bannerActions.DoBannerUpdateAction((data)));

    }

    public deletebanner(data) {
        this.appState.dispatch(new bannerActions.DoBannerDeleteAction(new BannerdeleteModel(data)));

    }

    subscribe() {

        this.subscriptions.push(this.getAddNewBanner$.subscribe(data => {
            if (data) {
                if (data.message) {
                    this.router.navigate(['/cms/banners/list']);
                }
            }
        }));

        this.subscriptions.push(this.getUpdatebanner$.subscribe(data => {
            if (data) {
                if (data.message) {
                    this.router.navigate(['/cms/banners/list']);
                }
            }
        }));

    }

    public ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}






