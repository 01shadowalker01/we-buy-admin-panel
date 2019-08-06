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

export interface CustomerState extends Map<string, any> {
    customerList: any;
    pagination: any;
    addcustomer: any;
    updatecustomer: any;
    deletecustomer: any;
    addAddressList: any;
    addAddressPagination: any;
    addAddressAdd: any;
    addAddressUpdate: any;
    deleteAddAddress: any;
    detailCustomer: any;

    detailLoading: boolean;
    detailLoaded: boolean;
    detailFailed: boolean;

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


    addressListLoading: boolean;
    addressListLoaded: boolean;
    addressListFailed: boolean;

    addressCountLoading: boolean;
    addressCountLoaded: boolean;
    addressCountFailed: boolean;

    addressAddLoading: boolean;
    addressAddLoaded: boolean;
    addressAddFailed: boolean;

    addressUpdateLoading: boolean;
    addressUpdateLoaded: boolean;
    addressUpdateFailed: boolean;

    addressDeleteLoading: boolean;
    addressDeleteLoaded: boolean;
    addressDeleteFailed: boolean;


}

export const CustomerStateRecord = Record({
    customerList: {},
    pagination: {},
    addcustomer: {},
    updatecustomer: {},
    deletecustomer: {},
    addAddressList: {},
    addAddressPagination: {},
    addAddressAdd: {},
    addAddressUpdate: {},
    deleteAddAddress: {},
    detailCustomer: {},

    detailLoading: false,
    detailLoaded: false,
    detailFailed: false,
    listLoading: false,
    listLoaded: false,
    listFailed: false,

    countLoading: false,
    countLoaded: false,
    countFailed: false,

    addLoading: false,
    addLoaded: false,
    addFailed: false,

    updateLoading: false,
    updateLoaded: false,
    updateFailed: false,

    deleteLoading: false,
    deleteLoaded: false,
    deleteFailed: false,

    addressListLoading: false,
    addressListLoaded: false,
    addressListFailed: false,

    addressCountLoading: false,
    addressCountLoaded: false,
    addressCountFailed: false,

    addressAddLoading: false,
    addressAddLoaded: false,
    addressAddFailed: false,

    addressUpdateLoading: false,
    addressUpdateLoaded: false,
    addressUpdateFailed: false,

    addressDeleteLoading: false,
    addressDeleteLoaded: false,
    addressDeleteFailed: false,

});
