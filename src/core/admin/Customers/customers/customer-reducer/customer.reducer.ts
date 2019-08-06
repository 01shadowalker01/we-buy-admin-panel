/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../customer-action/customers.action';
import {CustomerState, CustomerStateRecord} from './customer.state';
import {CustomerlistformResponseForm} from '../customer-model/customerlistform.response.model';
import {AddAddressListResponseForm} from '../customer-model/addAddresslistform.response.model';

export const initialState: CustomerState = new CustomerStateRecord() as CustomerState;

export function reducer(state = initialState, {type, payload}: any): CustomerState {
    if (!type) {
        return state;
    }

    switch (type) {
        // customer List
        case actions.ActionTypes.DO_Customers_List: {
            return Object.assign({}, state, {
                listLoading: true,
                listLoaded: false,
                listFailed: false,
            });
        }

        case actions.ActionTypes.DO_Customers_List_SUCCESS: {
            const custList = payload.data.map(_roles => {
                const tempListModel = new CustomerlistformResponseForm(_roles);
                return tempListModel;
            });
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: true,
                listFailed: false,
                customerList: custList
            });
        }

        case actions.ActionTypes.DO_Customers_List_FAIL: {
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: false,
                listFailed: true,
            });
        }
        // customer list pagination
        case actions.ActionTypes.DO_PAGINATION_CUSTOMER_List: {
            return Object.assign({}, state, {
                countLoading: true,
                countLoaded: false,
                countFailed: false,
            });
        }
        case actions.ActionTypes.DO_PAGINATION_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                countLoading: false,
                countLoaded: true,
                countFailed: false,
                pagination: payload.data
            });
        }
        case actions.ActionTypes.DO_PAGINATION_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                countLoading: false,
                countLoaded: true,
                countFailed: true
            });
        }
        // customer Update
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_ACTION: {
            return Object.assign({}, state, {
                updateLoading: true,
                updateLoaded: false,
                updateFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: true,
                updateFailed: false,
                updatecustomer: payload
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: false,
                updateFailed: true,
                deletecustomer: payload
            });
        }

        // Add Customer
        case actions.ActionTypes.DO_ADD_Customers_Action: {
            return Object.assign({}, state, {
                addLoading: true,
                addLoaded: false,
                addFailed: false,
            });
        }

        case actions.ActionTypes.DO_ADD_Customers_SUCCESS: {
            return Object.assign({}, state, {
                addLoading: false,
                addLoaded: true,
                addFailed: false,
                addcustomer: payload
            });
        }
        case actions.ActionTypes.DO_ADD_Customers_FAIL: {
            return Object.assign({}, state, {
                addLoading: false,
                addLoaded: false,
                addFailed: true,
                addcustomer: payload
            });
        }
        // Add Address list
        case actions.ActionTypes.DO_ADD_ADDRESS_LIST_ACTION: {
            return Object.assign({}, state, {
                addressListLoading: true,
                addressListLoaded: false,
                addressListFailed: false,
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_LIST_SUCCESS: {
            const custaddressList = payload.data.map(_address => {
                const tempListModel = new AddAddressListResponseForm(_address);
                return tempListModel;
            });
            return Object.assign({}, state, {
                addressListLoading: false,
                addressListLoaded: true,
                addressListFailed: false,
                addAddressList: custaddressList
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_LIST_FAIL: {
            return Object.assign({}, state, {
                addressListLoading: false,
                addressListLoaded: false,
                addressListFailed: true,

            });
        }
        // address pagination
        case actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_ACTION: {
            return Object.assign({}, state, {
                addressCountLoading: true,
                addressCountLoaded: false,
                addressCountFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_SUCCESS: {
            return Object.assign({}, state, {
                addressCountLoading: false,
                addressCountLoaded: true,
                addressCountFailed: false,
                addAddressPagination: payload.data
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_FAIL: {
            return Object.assign({}, state, {
                addressCountLoading: false,
                addressCountLoaded: true,
                addressCountFailed: true
            });
        }
        // Add Address
        case actions.ActionTypes.DO_ADD_ADDRESS_ADD_ACTION: {
            return Object.assign({}, state, {
                addressAddLoading: true,
                addressAddLoaded: false,
                addressAddFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_ADD_SUCCESS: {
            return Object.assign({}, state, {
                addressAddLoading: false,
                addressAddLoaded: true,
                addressAddFailed: false,
                addAddressAdd: payload
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_ADD_FAIL: {
            return Object.assign({}, state, {
                addressAddLoading: false,
                addressAddLoaded: false,
                addressAddFailed: true,
                addAddressAdd: payload
            });
        }
        // update Address
        case actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_ACTION: {
            return Object.assign({}, state, {
                addressUpdateLoading: true,
                addressUpdateLoaded: false,
                addressUpdateFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_SUCCESS: {
            return Object.assign({}, state, {
                addressUpdateLoading: false,
                addressUpdateLoaded: true,
                addressUpdateFailed: false,
                addAddressUpdate: payload.user
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_FAIL: {
            return Object.assign({}, state, {
                addressUpdateLoading: false,
                addressUpdateLoaded: false,
                addressUpdateFailed: true,
                addAddressUpdate: payload.user
            });
        }
        // delete address
        case actions.ActionTypes.DO_ADD_ADDRESS_DELETE_ACTION: {
            return Object.assign({}, state, {
                addressDeleteLoading: true,
                addressDeleteLoaded: false,
                addressDeleteFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                addressDeleteLoading: false,
                addressDeleteLoaded: true,
                addressDeleteFailed: false,
                deleteAddAddress: payload
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_DELETE_FAIL: {
            return Object.assign({}, state, {
                addressDeleteLoading: false,
                addressDeleteLoaded: false,
                addressDeleteFailed: true,
                deleteAddAddress: payload
            });
        }
        // delete customer
        case actions.ActionTypes.DO_DELETE_CUSTOMER_ACTION: {
            return Object.assign({}, state, {
                deleteLoading: true,
                deleteLoaded: false,
                deleteFailed: false,
            });
        }
        case actions.ActionTypes.DO_DELETE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: true,
                deleteFailed: false,
                deletecustomer: payload
            });
        }

        case actions.ActionTypes.DO_DELETE_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: false,
                deleteFailed: true,
                deletecustomer: payload
            });
        }

        // customer  Detail
        case actions.ActionTypes.DO_CUSTOMER_DETAIL_ACTION: {
            return Object.assign({}, state, {
                detailLoading: true,
                detailLoaded: false,
                detailFailed: false,
            });
        }
        case actions.ActionTypes.DO_CUSTOMER_DETAIL_SUCCESS: {
            return Object.assign({}, state, {
                detailLoading: false,
                detailLoaded: true,
                detailFailed: false,
                detailCustomer: payload.data,
            });
        }
        case actions.ActionTypes.DO_CUSTOMER_DETAIL_FAIL: {
            return Object.assign({}, state, {
                detailLoading: false,
                detailLoaded: false,
                detailFailed: true,
            });
        }


        default: {
            return state;
        }
    }
}

// customer list
export const getcustlist = (state: CustomerState) => state.customerList;
export const getlistLoading = (state: CustomerState) => state.listLoading;
export const getlistLoaded = (state: CustomerState) => state.listLoaded;
export const getlistFailed = (state: CustomerState) => state.listFailed;

// customer Add
export const getaddcustomer = (state: CustomerState) => state.addcustomer;
export const getaddLoading = (state: CustomerState) => state.addLoading;
export const getaddLoaded = (state: CustomerState) => state.addLoaded;
export const getaddFailed = (state: CustomerState) => state.addFailed;

// customer update
export const getupdatecust = (state: CustomerState) => state.updatecustomer;
export const getupdateLoading = (state: CustomerState) => state.updateLoading;
export const getupdateLoaded = (state: CustomerState) => state.updateLoaded;
export const getupdateFailed = (state: CustomerState) => state.updateFailed;

// customer delete
export const getdeletecust = (state: CustomerState) => state.deletecustomer;
export const getdeleteLoading = (state: CustomerState) => state.deleteLoading;
export const getdeleteLoaded = (state: CustomerState) => state.deleteLoaded;
export const getdeleteFailed = (state: CustomerState) => state.deleteFailed;

// customer Count
export const getpagination = (state: CustomerState) => state.pagination;
export const getcountLoading = (state: CustomerState) => state.countLoading;
export const getcountLoaded = (state: CustomerState) => state.countLoaded;
export const getcountFailed = (state: CustomerState) => state.countFailed;


/*ADDRESS */
// address List
export const getaddaddresslist = (state: CustomerState) => state.addAddressList;
export const getaddresslistLoading = (state: CustomerState) => state.addressListLoading;
export const getaddresslistLoaded = (state: CustomerState) => state.addressListLoaded;
export const getaddresslistFailed = (state: CustomerState) => state.addressListFailed;

// address pagination
export const getaddaddresspagination = (state: CustomerState) => state.addAddressPagination;
export const getaddressaddLoading = (state: CustomerState) => state.addressAddLoading;
export const getaddressaddLoaded = (state: CustomerState) => state.addressAddLoaded;
export const getaddressaddFailed = (state: CustomerState) => state.addressAddFailed;

// update address
export const getaddaddressUpdate = (state: CustomerState) => state.addAddressUpdate;
export const getaddressupdateLoading = (state: CustomerState) => state.addressUpdateLoading;
export const getaddressupdateLoaded = (state: CustomerState) => state.addressUpdateLoaded;
export const getaddressupdateFailed = (state: CustomerState) => state.addressUpdateFailed;

// delete Address
export const getaddaddressDelete = (state: CustomerState) => state.deleteAddAddress;
export const getaddressdeleteLoading = (state: CustomerState) => state.addressDeleteLoading;
export const getaddressdeleteLoaded = (state: CustomerState) => state.addressDeleteLoaded;
export const getaddressdeleteFailed = (state: CustomerState) => state.addressDeleteFailed;
// address Count List
export const getaddaddressAdd = (state: CustomerState) => state.addAddressAdd;
export const getaddresscountLoading = (state: CustomerState) => state.addressCountLoading;
export const getaddresscountLoaded = (state: CustomerState) => state.addressCountLoaded;
export const getaddresscountFailed = (state: CustomerState) => state.addressCountFailed;


// Customer Detail
export const getDetailCustomer = (state: CustomerState) => state.detailCustomer;
export const getDetailLoading = (state: CustomerState) => state.detailLoading;
export const getDetailLoaded = (state: CustomerState) => state.detailLoaded;
export const getDetailFailed = (state: CustomerState) => state.detailFailed;



