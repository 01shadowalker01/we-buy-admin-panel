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


export interface CountryState extends Map<string, any> {
    newCountry: any;
    updateCountry: any;
    countryList: any;
    countryCount: number;
    countryDelete: any;

    listLoading: boolean;
    listLoaded: boolean;
    listFailed: boolean;

    countLoading: boolean;
    countLoaded: boolean;
    countFailed: boolean;

    addLoading: boolean;
    addLoaded: boolean;
    addFailed: boolean;


    updateLoading: boolean;
    updateLoaded: boolean;
    updateFailed: boolean;

    deleteLoading: boolean;
    deleteLoaded: boolean;
    deleteFailed: boolean;
}

export const CountryRecordState = Record({
    newCountry: {},
    updateCountry: {},
    countryList: {},
    countryCount: 0,
    countryDelete: {},

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
