/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../../../localizations/languages/languages-action/languages.action';
import {LanguageState, LanguageRecordState} from './languages.state';
import {LanguagesListResponseModel} from '../languages-model/languages-list-response.model';
import {LanguagesResponseModel} from '../languages-model/languages.response.model';

export const initialState: LanguageState = new LanguageRecordState() as LanguageState;

export function reducer(state = initialState, {type, payload}: any): LanguageState {
    if (!type) {
        return state;
    }

    switch (type) {


        case actions.ActionTypes.DO_LANG_LIST: {
            return Object.assign({}, state, {
                listLoading: true,
                listLoaded: false,
                listFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATE_LANG_ACTION: {
            return Object.assign({}, state, {
                updateLoading: true,
                updateLoaded: false,
                updateFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_LANG_ACTION: {
            return Object.assign({}, state, {
                addLoading: true,
                addLoaded: false,
                addFailed: false,
            });
        }

        case actions.ActionTypes.DO_DELETE_LANG_ACTION: {
            return Object.assign({}, state, {
                deleteLoading: true,
                deleteLoaded: false,
                deleteFailed: false,
            });
        }
        case actions.ActionTypes.DO_LANG_LIST_PAGIATION: {
            return Object.assign({}, state, {
                countLoading: true,
                countLoaded: false,
                countFailed: false,

            });
        }


        case actions.ActionTypes.DO_LANG_LIST_SUCCESS: {
            const languageList = payload.data.map(_language => {
                const tempListModel = new LanguagesListResponseModel(_language);
                return tempListModel;
            });
            return Object.assign({}, state, {
                languagelist: languageList,
                listLoading: false,
                listLoaded: true,
                listFailed: false,

            });
        }

        case actions.ActionTypes.DO_LANG_LIST_PAGIATION_SUCCESS: {
            return Object.assign({}, state, {
                languagepagination: payload.data,
                countLoading: false,
                countLoaded: true,
                countFailed: false,

            });
        }


        case actions.ActionTypes.DO_ADD_LANG_SUCCESS: {
            const language = new LanguagesResponseModel(payload.data);
            return Object.assign({}, state, {
                languageadd: payload,
                languageaddDetail: language,
                addLoading: false,
                addLoaded: true,
                addFailed: false

            });
        }
        case actions.ActionTypes.DO_ADD_LANG_FAIL: {
            return Object.assign({}, state, {
                languageadd: payload,
                addLoading: false,
                addLoaded: true,
                addFailed: true,

            });
        }
        case actions.ActionTypes.DO_UPDATE_LANG_SUCCESS: {
            return Object.assign({}, state, {
                languageupdate: payload,
                updateLoading: false,
                updateLoaded: true,
                updateFailed: false,

            });
        }
        case actions.ActionTypes.DO_UPDATE_LANG_FAIL: {
            return Object.assign({}, state, {
                languageupdate: payload,
                updateLoading: false,
                updateLoaded: true,
                updateFailed: true,

            });
        }
        case actions.ActionTypes.DO_DELETE_LANG_SUCCESS: {
            return Object.assign({}, state, {
                languagedelete: payload,
                deleteLoading: false,
                deleteLoaded: true,
                deleteFailed: false,

            });
        }

        case actions.ActionTypes.DO_DELETE_LANG_FAIL: {
            return Object.assign({}, state, {
                languagedelete: payload,
                deleteLoading: false,
                deleteLoaded: true,
                deleteFailed: true,

            });
        }


        case actions.ActionTypes.DO_LANG_LIST_FAIL: {
            return Object.assign({}, initialState, {
                listLoading: false,
                listLoaded: true,
                listFailed: true,
            });
        }
        case actions.ActionTypes.DO_LANG_LIST_PAGIATION_FAIL: {
            return Object.assign({}, initialState, {
                countLoading: false,
                countLoaded: true,
                countFailed: true,
            });
        }


        default: {
            return state;
        }
    }
}


export const getlanguagelist = (state: LanguageState) => state.languagelist;
export const getlanguageupdate = (state: LanguageState) => state.languageupdate;
export const getlanguagepagination = (state: LanguageState) => state.languagepagination;
export const getlanguagesadd = (state: LanguageState) => state.languageadd;
export const getlanguagesaddDetail = (state: LanguageState) => state.languageaddDetail;
export const getlanguagesdelete = (state: LanguageState) => state.languagedelete;

export const getLanguageListLoading = (state: LanguageState) => state.listLoading;
export const getLanguageListLoaded = (state: LanguageState) => state.listLoaded;
export const getLanguageListFailed = (state: LanguageState) => state.listFailed;

export const getLanguageCountLoading = (state: LanguageState) => state.countLoading;
export const getLanguageCountLoaded = (state: LanguageState) => state.countLoaded;
export const getLanguageCountFailed = (state: LanguageState) => state.countFailed;

export const getLanguageAddLoading = (state: LanguageState) => state.addLoading;
export const getLanguageAddLoaded = (state: LanguageState) => state.addLoaded;
export const getLanguageAddFailed = (state: LanguageState) => state.addFailed;

export const getLanguageUpdateLoading = (state: LanguageState) => state.updateLoading;
export const getLanguageUpdateLoaded = (state: LanguageState) => state.updateLoaded;
export const getLanguageUpdateFailed = (state: LanguageState) => state.updateFailed;

export const getLanguageDeleteLoading = (state: LanguageState) => state.deleteLoading;
export const getLanguageDeleteLoaded = (state: LanguageState) => state.deleteLoaded;
export const getLanguageDeleteFailed = (state: LanguageState) => state.deleteFailed;


