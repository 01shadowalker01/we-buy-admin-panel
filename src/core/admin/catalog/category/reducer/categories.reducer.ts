/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../action/categories.action';
// state
import {CategoriesState, CategoriesStateRecord} from './categories.state';
// model
import {CategorylistResponseModel} from '../models/categorylist.response.model';
import {CategoryResponseModel} from '../models/category.response.model';

export const initialState: CategoriesState = new CategoriesStateRecord() as CategoriesState;

export function reducer(state = initialState, {type, payload}: any): CategoriesState {

    if (!type) {
        return state;
    }

    switch (type) {
        // category list action
        case actions.ActionTypes.DO_CATEGORIES_LIST: {
            return Object.assign({}, state, {

                categoriesListResponse: false,
                categoriesListRequestLoading: true,
                categoriesListRequestLoaded: false,
                categoriesListRequestFailed: false,
            });
        }
        case actions.ActionTypes.DO_CATEGORIES_LIST_SUCCESS: {
            const categoriesModel = payload.data.map(list => {
                // categoryListFilter
                const tempcategoriesModel = new CategorylistResponseModel(list);
                return tempcategoriesModel;
            });
            let categoriesFilterModel = [];
            if (!state.categoryListFilter) {
                 categoriesFilterModel = payload.data.map(list => {
                    const tempcategoriesFilterModel = new CategorylistResponseModel(list);
                    return tempcategoriesFilterModel;
                });
            } else {
                categoriesFilterModel = state.categoryListFilter;
            }
            return Object.assign({}, state, {
                categoryList: categoriesModel,
                categoryListFilter: categoriesFilterModel,
                categoriesListResponse: true,
                categoriesListRequestLoading: false,
                categoriesListRequestLoaded: false,
                categoriesListRequestFailed: false,

            });
        }
        case actions.ActionTypes.DO_CATEGORIES_LIST_FAIL: {
            return Object.assign({}, initialState, {

                categoriesCountResponse: false,
                categoriesCountRequestLoading: false,
                categoriesCountRequestLoaded: true,
                categoriesCountRequestFailed: true,
            });
        }
        // category delete action
        case actions.ActionTypes.DO_DELETE_CATEGORIES: {
            return Object.assign({}, state, {

                deleteCategoriesResponse: false,
                deleteCategoriesRequestLoading: true,
                deleteCategoriesRequestLoaded: false,
                deleteCategoriesRequestFailed: false,
            });
        }
        case actions.ActionTypes.DO_DELETE_CATEGORIES_SUCCESS: {
            return Object.assign({}, state, {
                categoryDoDelete: payload,
                deleteCategoriesResponse: true,
                deleteCategoriesRequestLoading: false,
                deleteCategoriesRequestLoaded: false,
                deleteCategoriesRequestFailed: false,

            });
        }
        case actions.ActionTypes.DO_DELETE_CATEGORIES_FAIL: {
            return Object.assign({}, initialState, {
                deleteCategoriesResponse: false,
                deleteCategoriesRequestLoading: false,
                deleteCategoriesRequestLoaded: true,
                deleteCategoriesRequestFailed: true,
            });
        }
        // category add action
        case actions.ActionTypes.DO_ADDCATEGORIES: {

            return Object.assign({}, state, {

                addCategoriesResponse: false,
                addCategoriesRequestLoading: true,
                addCategoriesRequestLoaded: false,
                addCategoriesRequestFailed: false,


            });
        }
        case actions.ActionTypes.DO_ADDCATEGORIES_SUCCESS: {
            return Object.assign({}, state, {
                addCatagoryStatus: payload,
                addCategoriesRequestLoading: false,
                addCategoriesRequestLoaded: true,
                addCategoriesRequestFailed: false,
            });
            return Object.assign({}, state, {

                addCatagory: payload,
                addCategoriesResponse: true,
                addCategoriesRequestLoading: false,
                addCategoriesRequestLoaded: false,
                addCategoriesRequestFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADDCATEGORIES_FAIL: {
            return Object.assign({}, state, {
                addCategoriesResponse: false,
                addCategoriesRequestLoading: false,
                addCategoriesRequestLoaded: true,
                addCategoriesRequestFailed: true,
            });
        }
        // category update action

        case actions.ActionTypes.DO_UPDATECATEGORIES: {
            return Object.assign({}, state, {
                updateCategoriesResponse: false,
                updateCategoriesRequestLoading: true,
                updateCategoriesRequestLoaded: false,
                updateCategoriesRequestFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATECATEGORIES_SUCCESS: {
            return Object.assign({}, state, {

                updateCatagory: payload,
                updateCategoriesResponse: true,
                updateCategoriesRequestLoading: false,
                updateCategoriesRequestLoaded: false,
                updateCategoriesRequestFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATECATEGORIES_FAIL: {
            return Object.assign({}, state, {

                updateCategoryBadresponse: payload,
                updateCategoriesResponse: false,
                updateCategoriesRequestLoading: false,
                updateCategoriesRequestLoaded: true,
                updateCategoriesRequestFailed: true,
            });
        }

        // product remove action

        case actions.ActionTypes.DO_PRODUCT_REMOVE: {
            const Data: any = state.categoryList;

            for (let i = 0; i < Data.length; i++) {
                if (i === payload) {
                    Data.splice(payload, 1);

                }

            }
            return Object.assign({}, state, {

                productRemoveList: Data,
                productRemoveResponse: false,
                productRemoveRequestLoading: true,
                productRemoveRequestLoaded: false,
                productRemoveRequestFailed: false,
            });
        }


        // product add action

        case actions.ActionTypes.DO_PRODUCT_ADD: {
            const Data: any = state.categoryList;

            Data.push(payload);

            return Object.assign({}, state, {

                categoryList: Data,
                productAddResponse: false,
                productAddRequestLoading: true,
                productAddRequestLoaded: false,
                productAddRequestFailed: false,
            });
        }
        // category count action
        case actions.ActionTypes.DO_CATEGORIESCOUNT: {
            return Object.assign({}, state, {

                categoriesCountResponse: false,
                categoriesCountRequestLoading: true,
                categoriesCountRequestLoaded: false,
                categoriesCountRequestFailed: false,
            });
        }
        case actions.ActionTypes.DO_CATEGORIESCOUNT_SUCCESS: {
            return Object.assign({}, state, {
                categoryListnCount: payload.data,
                categoriesCountResponse: true,
                categoriesCountRequestLoading: false,
                categoriesCountRequestLoaded: false,
                categoriesCountRequestFailed: false,

            });
        }
        case actions.ActionTypes.DO_CATEGORIESCOUNT_FAIL: {
            return Object.assign({}, initialState, {
                categoriesCountResponse: false,
                categoriesCountRequestLoading: false,
                categoriesCountRequestLoaded: true,
                categoriesCountRequestFailed: true,
            });
        }
        default: {
            return state;
        }
    }
}

// category count action
export const getCategoryListnCount = (state: CategoriesState) => state.categoryListnCount;
export const getCategoriesCountResponse = (state: CategoriesState) => state.categoriesCountResponse;
export const getCategoriesCountRequestLoading = (state: CategoriesState) => state.categoriesCountRequestLoading;
export const getCategoriesCountRequestLoaded = (state: CategoriesState) => state.categoriesCountRequestLoaded;
export const getCategoriesCountRequestFailed = (state: CategoriesState) => state.categoriesCountRequestFailed;
export const getCategoryCountdata = (state: CategoriesState) => state.categoryCountData;
// category list action
export const getCategoryList = (state: CategoriesState) => state.categoryList;
// categoryListFilter
export const getCategoryFilterList = (state: CategoriesState) => state.categoryListFilter;

export const getCategoriesListResponse = (state: CategoriesState) => state.categoriesListResponse;
export const getCategoriesListRequestLoading = (state: CategoriesState) => state.categoriesListRequestLoading;
export const getCategoriesListRequestLoaded = (state: CategoriesState) => state.categoriesListRequestLoaded;
export const getCategoriesListRequestFailed = (state: CategoriesState) => state.categoriesListRequestFailed;

// category delete action
export const getCategoryDoDelete = (state: CategoriesState) => state.categoryDoDelete;
export const getDeleteCategoriesResponse = (state: CategoriesState) => state.deleteCategoriesResponse;
export const getDeleteCategoriesRequestLoading = (state: CategoriesState) => state.deleteCategoriesRequestLoading;
export const getDeleteCategoriesRequestLoaded = (state: CategoriesState) => state.deleteCategoriesRequestLoaded;
export const getDeleteCategoriesRequestFailed = (state: CategoriesState) => state.deleteCategoriesRequestFailed;
// category add action
export const getAddCatagoryStatus = (state: CategoriesState) => state.addCatagoryStatus;
export const getAddCatagoryData = (state: CategoriesState) => state.addCatagoryData;
export const getAddCategoriesResponse = (state: CategoriesState) => state.addCategoriesResponse;
export const getAddCategoriesRequestLoading = (state: CategoriesState) => state.addCategoriesRequestLoading;
export const getAddCategoriesRequestLoaded = (state: CategoriesState) => state.addCategoriesRequestLoaded;
export const getAddCategoriesRequestFailed = (state: CategoriesState) => state.addCategoriesRequestFailed;
// category update action
export const getUpdateCategoriesResponse = (state: CategoriesState) => state.updateCategoriesResponse;
export const getUpdateCategoriesRequestLoading = (state: CategoriesState) => state.updateCategoriesRequestLoading;
export const getUpdateCategoriesRequestLoaded = (state: CategoriesState) => state.updateCategoriesRequestLoaded;
export const getUpdateCategoriesRequestFailed = (state: CategoriesState) => state.updateCategoriesRequestFailed;
export const getUpdateCategoryBadresponse = (state: CategoriesState) => state.updateCategoryBadresponse;
export const getUpdateCatagory = (state: CategoriesState) => state.updateCatagory;
// product remove action
export const getProductRemoveResponse = (state: CategoriesState) => state.productRemoveResponse;
export const getProductRemoveRequestLoading = (state: CategoriesState) => state.productRemoveRequestLoading;
export const getProductRemoveRequestLoaded = (state: CategoriesState) => state.productRemoveRequestLoaded;
export const getProductRemoveRequestFailed = (state: CategoriesState) => state.productRemoveRequestFailed;
// product add action
export const getProductAddResponse = (state: CategoriesState) => state.productAddResponse;
export const getProductAddRequestLoading = (state: CategoriesState) => state.productAddRequestLoading;
export const getProductAddRequestLoaded = (state: CategoriesState) => state.productAddRequestLoaded;
export const getProductAddRequestFailed = (state: CategoriesState) => state.productAddRequestFailed;




