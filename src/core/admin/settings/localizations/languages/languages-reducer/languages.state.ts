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
import {LanguagesListResponseModel} from '../languages-model/languages-list-response.model';
import {LanguagesResponseModel} from '../languages-model/languages.response.model';


export interface LanguageState extends Map<string, any> {
    languagelist: Array<LanguagesListResponseModel>;
    languagepagination: any;
    languageupdate: any;
    languageadd: any;
    languageaddDetail: LanguagesResponseModel;
    languagedelete: any;

    listLoading: boolean;
    listLoaded: boolean;
    listFailed: boolean;

    countLoading: boolean;
    countLoaded: boolean;
    countFailed: boolean;

    addLoading: boolean;
    addLoaded: boolean;
    addFailed: boolean;

    updatLoading: boolean;
    updatLoaded: boolean;
    updatFailed: boolean;

    updateLoading: boolean;
    updateLoaded: boolean;
    updateFailed: boolean;

    deleteLoading: boolean;
    deleteLoaded: boolean;
    deleteFailed: boolean;

}

export const LanguageRecordState = Record({
    languagelist: {},
    languageupdate: {},
    languagepagination: {},
    languageadd: {},
    languagedelete: {},

    listLoading: false,
    listLoaded: false,
    listFailed: false,

    countLoading: false,
    countLoaded: false,
    countFailed: false,

    addLoading: false,
    addLoaded: false,
    addFailed: false,

    updatLoading: false,
    updatLoaded: false,
    updatFailed: false,

    updateLoading: false,
    updateLoaded: false,
    updateFailed: false,

    deleteLoading: false,
    deleteLoaded: false,
    deleteFailed: false,

});
