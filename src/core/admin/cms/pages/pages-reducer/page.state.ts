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

export interface PageState extends Map<string, any> {
    pagesList: any;
    pagesListCount: any;
    addPagesStatus: any;
    updatePages: any;
    pagesDelete: any;
    pagesListLoading: boolean;
    pagesListLoaded: boolean;
    pagesListFailed: boolean;
    pagesAddLoading: boolean;
    addPages: {};
    pagesAddLoaded: boolean;
    pagesAddFailed: boolean;
    pagesUpdateLoading: boolean;
    pagesUpdateLoaded: boolean;
    pagesUpdateFailed: boolean;
    pagesDeleteLoading: boolean;
    pagesDeleteLoaded: boolean;
    pagesDeleteFailed: boolean;
    pagesCountLoading: boolean;
    pagesCountLoaded: boolean;
    pagesCountFailed: boolean;

}

export const PagesStateRecord = Record({
    pagesList: {},
    pagesListCount: {},
    addPages: {},
    addPagesStatus: {},
    pagesDelete: {},
    updatePages: {},
    pagesListLoading: false,
    pagesListLoaded: false,
    pagesListFailed: false,
    pagesAddLoading: false,
    pagesAddLoaded: false,
    pagesAddFailed: false,
    pagesUpdateLoading: false,
    pagesUpdateLoaded: false,
    pagesUpdateFailed: false,
    pagesDeleteLoading: false,
    pagesDeleteLoaded: false,
    pagesDeleteFailed: false,
    pagesCountLoading: false,
    pagesCountLoaded: false,
    pagesCountFailed: false,
});
