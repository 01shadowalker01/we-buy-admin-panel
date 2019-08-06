/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Map, Record} from 'immutable';


export interface BannerState extends Map<string, any> {

    bannerList: any;
    bannerPagination: any;
    newBanner: any;
    updateBanner: any;
    deleteBanner: any;
    addBanner: any;
    bannerListLoaded: boolean;
    bannerListFailed: boolean;
    bannerListLoading: boolean;
    bannerAddLoaded: boolean;
    bannerAddFailed: boolean;
    bannerAddLoading: boolean;
    bannerUpdateLoading: boolean;
    bannerUpdateLoaded: boolean;
    bannerUpdateFailed: boolean;
    bannerDeleteLoading: boolean;
    bannerDeleteLoaded: boolean;
    bannerDeleteFailed: boolean;
    bannerCountLoading: boolean;
    bannerCountLoaded: boolean;
    bannerCountFailed: boolean;

}

export const BannerRecordState = Record({

    bannerList: {},
    bannerPagination: {},
    newBanner: {},
    updateBanner: {},
    deleteBanner: {},
    addBanner: {},
    bannerListLoaded: false,
    bannerListFailed: false,
    bannerListLoading: false,
    bannerAddLoaded: false,
    bannerAddFailed: false,
    bannerAddLoading: false,
    bannerUpdateLoading: false,
    bannerUpdateLoaded: false,
    bannerUpdateFailed: false,
    bannerDeleteLoading: false,
    bannerDeleteLoaded: false,
    bannerDeleteFailed: false,
    bannerCountLoading: false,
    bannerCountLoaded: false,
    bannerCountFailed: false


});
