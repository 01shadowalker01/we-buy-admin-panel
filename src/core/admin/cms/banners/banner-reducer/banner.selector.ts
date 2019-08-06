/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {createSelector} from 'reselect';
import * as frombanner from '../banner-reducer/banner.reducer';
import {AppState} from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getBannerState = (state: AppState) => state.banner;
export const getBannerlst = createSelector(getBannerState, frombanner.getBannerlist);
export const getbannerpagination = createSelector(getBannerState, frombanner.getbannerpagination);
export const getAddBanners = createSelector(getBannerState, frombanner.getAddBanner);
export const getaddBanner = createSelector(getBannerState, frombanner.getaddBanner);
export const getdeletebanner = createSelector(getBannerState, frombanner.getdeletebanner);

export const getbanneraddloaded = createSelector(getBannerState, frombanner.getbanneraddloaded);
export const getbanneraddfailed = createSelector(getBannerState, frombanner.getbanneraddfailed);
export const getbanneraddloading = createSelector(getBannerState, frombanner.getbanneraddloading);


export const getUpdatebanner = createSelector(getBannerState, frombanner.getUpdatebanner);
export const getbannerupdateloading = createSelector(getBannerState, frombanner.getbannerupdateloading);
export const getbannerupdateloaded = createSelector(getBannerState, frombanner.getbannerupdateloaded);
export const getbannerupdatefailed = createSelector(getBannerState, frombanner.getbannerupdatefailed);

export const getbannerdeleteloading = createSelector(getBannerState, frombanner.getbannerdeleteloading);
export const getbannerdeleteloaded = createSelector(getBannerState, frombanner.getbannerdeleteloaded);
export const getbannerdeletefailed = createSelector(getBannerState, frombanner.getbannerdeletefailed);

export const getbannercountloading = createSelector(getBannerState, frombanner.getbannercountloading);
export const getbannercountloaded = createSelector(getBannerState, frombanner.getbannercountloaded);
export const getbannercountfailed = createSelector(getBannerState, frombanner.getbannercountfailed);

export const getbannerlistloaded = createSelector(getBannerState, frombanner.getbannerlistloaded);
export const getbannerlistfailed = createSelector(getBannerState, frombanner.getbannerlistfailed);
export const getbannerlistloading = createSelector(getBannerState, frombanner.getbannerlistloading);

