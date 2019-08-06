/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../../shared/utility/utilityHelpers';


export const ActionTypes = {
    DO_Customers_List: type('[CustomerList] customerList'),
    DO_Customers_List_SUCCESS: type('[CustomerList success] Customer list Success'),
    DO_Customers_List_FAIL: type('[CustomerList Fail] Customer list Fail'),

    DO_ADD_Customers_Action: type('[Add Customer]  add Customer'),
    DO_ADD_Customers_SUCCESS: type('[Add Customer success] add Customer Success'),
    DO_ADD_Customers_FAIL: type('[Add Customer Fail] add Customer Fail'),

    DO_PAGINATION_CUSTOMER_List: type('[PAGINATION_Customer_List] PAGINATION_Customer_List'),
    DO_PAGINATION_CUSTOMER_SUCCESS: type('[PAGINATION_Customer_List success] PAGINATION_CUSTOMER_List  Success'),
    DO_PAGINATION_CUSTOMER_FAIL: type('[PAGINATION_Customer_List Fail] PAGINATION_Customer_List  Fail'),

    DO_UPDATE_CUSTOMER_ACTION: type('[Update Customer List] Update_Customer List'),
    DO_UPDATE_CUSTOMER_SUCCESS: type('[Update Customer_List success] Upadte_Customer List Success'),
    DO_UPDATE_CUSTOMER_FAIL: type('[Update Customer_List Fail] Update_Customer_Fail'),

    DO_DELETE_CUSTOMER_ACTION: type('[Delete Customer] Delete Customer'),
    DO_DELETE_CUSTOMER_SUCCESS: type('[Delete Customer] Delete Customer  Success'),
    DO_DELETE_CUSTOMER_FAIL: type('[Delete Customer] Delete Customer Fail'),

    DO_ADD_ADDRESS_LIST_ACTION: type('[Customer Address List] Customer Address List'),
    DO_ADD_ADDRESS_LIST_SUCCESS: type('[Customer Address List] Customer Address List  Success'),
    DO_ADD_ADDRESS_LIST_FAIL: type('[Customer Address List] Customer Address List Fail'),

    DO_ADD_ADDRESS_PAGINATION_ACTION: type('[Customer Address List pagination] Customer Address List pagination'),
    DO_ADD_ADDRESS_PAGINATION_SUCCESS: type('[Customer Address List pagination] Customer Address List pagination  Success'),
    DO_ADD_ADDRESS_PAGINATION_FAIL: type('[Customer Address List pagination] Customer Address List pagination Fail'),

    DO_ADD_ADDRESS_ADD_ACTION: type('[Customer Add Address Add ] Customer Add Address Add '),
    DO_ADD_ADDRESS_ADD_SUCCESS: type('[Customer Add Address Add success] Customer Add Address Add   Success'),
    DO_ADD_ADDRESS_ADD_FAIL: type('[Customer Add Address Add fail] Customer Add Address Add  Fail'),

    DO_ADD_ADDRESS_UPDATE_ACTION: type('[Customer Add Address Update ] Customer Add Address Update '),
    DO_ADD_ADDRESS_UPDATE_SUCCESS: type('[Customer Add Address Update success] Customer Add Address Update   Success'),
    DO_ADD_ADDRESS_UPDATE_FAIL: type('[Customer Add Address Update fail] Customer Add Address Update  Fail'),

    DO_ADD_ADDRESS_DELETE_ACTION: type('[Delete Add Address] Delete Add Address'),
    DO_ADD_ADDRESS_DELETE_SUCCESS: type('[Delete Add Address] Delete Add Address  Success'),
    DO_ADD_ADDRESS_DELETE_FAIL: type('[Delete Add Address] Delete Add Address Fail'),


    DO_CUSTOMER_DETAIL_ACTION: type('[ view_Customer_Detail ] view Customer Detail_action '),
    DO_CUSTOMER_DETAIL_SUCCESS: type('[ view_Customer_Detail_success]  view Customer Detail Success'),
    DO_CUSTOMER_DETAIL_FAIL: type('[ view_Customer _Detail_fail]  view Customer Detail  Fail'),


};


// customer list
export class DoCustomersListAction implements Action {
    type = ActionTypes.DO_Customers_List;

    constructor(public payload: any) {
    }
}

export class DoCustomerslistSuccessAction implements Action {
    type = ActionTypes.DO_Customers_List_SUCCESS;

    constructor(public payload: any) {
    }

}

export class DoCustomerslistFailAction implements Action {
    type = ActionTypes.DO_Customers_List_FAIL;

    constructor(public payload: any = null) {

    }
}

// PAGINATION customer
export class DoPaginationCustomersListAction implements Action {
    type = ActionTypes.DO_PAGINATION_CUSTOMER_List;

    constructor(public payload: any) {

    }
}

export class DoPaginationCustomersSuccessAction implements Action {
    type = ActionTypes.DO_PAGINATION_CUSTOMER_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoPaginationCustomersFailAction implements Action {
    type = ActionTypes.DO_PAGINATION_CUSTOMER_FAIL;

    constructor(public payload: any = null) {
    }
}

// Add customer
export class DoAddCustomersListAction implements Action {
    type = ActionTypes.DO_ADD_Customers_Action;

    constructor(public payload: any) {

    }
}

export class DoAddCustomersListActionSuccess implements Action {
    type = ActionTypes.DO_ADD_Customers_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddCustomersListFailAction implements Action {
    type = ActionTypes.DO_ADD_Customers_FAIL;

    constructor(public payload: any = null) {

    }
}


// Update customer
export class DoUpdateCustomerAction implements Action {
    type = ActionTypes.DO_UPDATE_CUSTOMER_ACTION;

    constructor(public payload: any) {

    }
}

export class DoUpdateCustomerSuccess implements Action {
    type = ActionTypes.DO_UPDATE_CUSTOMER_SUCCESS;

    constructor(public payload: any) {


    }
}

export class DoUpdateCustomerFail implements Action {
    type = ActionTypes.DO_UPDATE_CUSTOMER_FAIL;

    constructor(public payload: any = null) {

    }
}

// delete customer

export class DoDeleteCustomerAction implements Action {
    type = ActionTypes.DO_DELETE_CUSTOMER_ACTION;

    constructor(public payload: any) {

    }
}

export class DoDeleteCustomerSuccess implements Action {
    type = ActionTypes.DO_DELETE_CUSTOMER_SUCCESS;

    constructor(public payload: any) {


    }
}

export class DoDeleteCustomerFail implements Action {
    type = ActionTypes.DO_DELETE_CUSTOMER_FAIL;

    constructor(public payload: any = null) {

    }
}

// Add Address List
export class DoAddAddressListAction implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_LIST_ACTION;

    constructor(public payload: any) {

    }
}

export class DoAddAddressListSuccess implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddAddressListFail implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}

// Add Address List

export class DoAddAddressPaginationtAction implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_PAGINATION_ACTION;

    constructor(public payload: any) {
    }
}

export class DoAddAddressPaginationSuccess implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_PAGINATION_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoAddAddressPaginationFail implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_PAGINATION_FAIL;

    constructor(public payload: any = null) {

    }
}

// Add Address Add


export class DoAddAddressAddAction implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_ADD_ACTION;

    constructor(public payload: any) {
    }
}

export class DoAddAddressAddSuccess implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_ADD_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddAddressAddFail implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_ADD_FAIL;

    constructor(public payload: any = null) {
    }
}

// update Add Address
export class DoAddAddressUpdateAction implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_UPDATE_ACTION;

    constructor(public payload: any) {
    }
}

export class DoAddAddressUpdateSuccess implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_UPDATE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddAddressUpdateFail implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_UPDATE_FAIL;

    constructor(public payload: any = null) {
    }
}

// Delete Add Address


export class DoDeleteAddAddressAction implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_DELETE_ACTION;

    constructor(public payload: any) {
    }
}

export class DoDeleteAddAddressSuccess implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_DELETE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoDeleteAddAddressFail implements Action {
    type = ActionTypes.DO_ADD_ADDRESS_DELETE_FAIL;

    constructor(public payload: any = null) {
    }
}


// Customer Detail


export class DoCustomerDetailAction implements Action {
    type = ActionTypes.DO_CUSTOMER_DETAIL_ACTION;

    constructor(public payload: any) {
    }
}

export class DoCustomerDetailSuccess implements Action {
    type = ActionTypes.DO_CUSTOMER_DETAIL_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoCustomerDetailFail implements Action {
    type = ActionTypes.DO_CUSTOMER_DETAIL_FAIL;

    constructor(public payload: any = null) {
    }
}

export type Actions
    =
    DoCustomersListAction
    | DoCustomerslistSuccessAction
    | DoCustomerslistFailAction
    | DoPaginationCustomersSuccessAction
    | DoPaginationCustomersFailAction
    | DoAddCustomersListAction
    | DoAddCustomersListActionSuccess
    | DoAddCustomersListFailAction
    | DoUpdateCustomerAction
    | DoUpdateCustomerSuccess
    | DoUpdateCustomerFail
    | DoDeleteCustomerAction
    | DoDeleteCustomerSuccess
    | DoDeleteCustomerFail
    | DoAddAddressListAction
    | DoAddAddressListSuccess
    | DoAddAddressListFail
    | DoAddAddressPaginationtAction
    | DoAddAddressPaginationSuccess
    | DoAddAddressPaginationFail
    | DoAddAddressAddAction
    | DoAddAddressAddSuccess
    | DoAddAddressAddFail
    | DoAddAddressUpdateAction
    | DoAddAddressUpdateSuccess
    | DoAddAddressUpdateFail
    | DoDeleteAddAddressAction
    | DoDeleteAddAddressSuccess
    | DoDeleteAddAddressFail
    | DoCustomerDetailAction
    | DoCustomerDetailSuccess
    | DoCustomerDetailFail
    ;
