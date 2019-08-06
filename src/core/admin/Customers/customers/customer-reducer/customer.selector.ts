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
import * as fromCustomer from './customer.reducer';
import {AppState} from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * customer store functions
 */
export const getCustomerState = (state: AppState) => state.customer;

/* Customers*/
// customer List
export const getcustomerslist = createSelector(getCustomerState, fromCustomer.getcustlist);
export const getlistLoading = createSelector(getCustomerState, fromCustomer.getlistLoading);
export const getlistLoaded = createSelector(getCustomerState, fromCustomer.getlistLoaded);
export const getlistFailed = createSelector(getCustomerState, fromCustomer.getlistFailed);

// customer Add
export const getnewcustomer = createSelector(getCustomerState, fromCustomer.getaddcustomer);
export const getaddLoading = createSelector(getCustomerState, fromCustomer.getaddLoading);
export const getaddLoaded = createSelector(getCustomerState, fromCustomer.getaddLoaded);
export const getaddFailed = createSelector(getCustomerState, fromCustomer.getaddFailed);

// customer update
export const getupdatecustomers = createSelector(getCustomerState, fromCustomer.getupdatecust);
export const getupdateLoading = createSelector(getCustomerState, fromCustomer.getupdateLoading);
export const getupdateLoaded = createSelector(getCustomerState, fromCustomer.getupdateLoaded);
export const getupdateFailed = createSelector(getCustomerState, fromCustomer.getupdateFailed);

// customer delete
export const getdeletecustomer = createSelector(getCustomerState, fromCustomer.getdeletecust);
export const getdeleteLoading = createSelector(getCustomerState, fromCustomer.getdeleteLoading);
export const getdeleteLoaded = createSelector(getCustomerState, fromCustomer.getdeleteLoaded);
export const getdeleteFailed = createSelector(getCustomerState, fromCustomer.getdeleteFailed);

// customer count
export const getpagination = createSelector(getCustomerState, fromCustomer.getpagination);
export const getcountLoading = createSelector(getCustomerState, fromCustomer.getcountLoading);
export const getcountLoaded = createSelector(getCustomerState, fromCustomer.getcountLoaded);
export const getcountFailed = createSelector(getCustomerState, fromCustomer.getcountFailed);

/* Address*/
// address list
export const getaddaddresslist = createSelector(getCustomerState, fromCustomer.getaddaddresslist);
export const getaddresslistLoading = createSelector(getCustomerState, fromCustomer.getaddresslistLoading);
export const getaddresslistLoaded = createSelector(getCustomerState, fromCustomer.getaddresslistLoaded);
export const getaddresslistFailed = createSelector(getCustomerState, fromCustomer.getaddresslistFailed);

// add address
export const getaddaddressadd = createSelector(getCustomerState, fromCustomer.getaddaddressAdd);
export const getaddressaddLoading = createSelector(getCustomerState, fromCustomer.getaddressaddLoading);
export const getaddressaddLoaded = createSelector(getCustomerState, fromCustomer.getaddressaddLoaded);
export const getaddressaddFailed = createSelector(getCustomerState, fromCustomer.getaddressaddFailed);

// update Address
export const getaddaddressupdate = createSelector(getCustomerState, fromCustomer.getaddaddressUpdate);
export const getaddressupdateLoading = createSelector(getCustomerState, fromCustomer.getaddressupdateLoading);
export const getaddressupdateLoaded = createSelector(getCustomerState, fromCustomer.getaddressupdateLoaded);
export const getaddressupdateFailed = createSelector(getCustomerState, fromCustomer.getaddressupdateFailed);

// delete Address
export const getaddaddressdelete = createSelector(getCustomerState, fromCustomer.getaddaddressDelete);
export const getaddressdeleteLoading = createSelector(getCustomerState, fromCustomer.getaddressdeleteLoading);
export const getaddressdeleteLoaded = createSelector(getCustomerState, fromCustomer.getaddressdeleteLoaded);
export const getaddressdeleteFailed = createSelector(getCustomerState, fromCustomer.getaddressdeleteFailed);

// address count
export const getaddaddresspagination = createSelector(getCustomerState, fromCustomer.getaddaddresspagination);
export const getaddresscountLoading = createSelector(getCustomerState, fromCustomer.getaddresscountLoading);
export const getaddresscountLoaded = createSelector(getCustomerState, fromCustomer.getaddresscountLoaded);
export const getaddresscountFailed = createSelector(getCustomerState, fromCustomer.getaddresscountFailed);

// customer  detail
export const getDetailCustomer = createSelector(getCustomerState, fromCustomer.getDetailCustomer);
export const getDetailLoading = createSelector(getCustomerState, fromCustomer.getDetailLoading);
export const getDetailLoaded = createSelector(getCustomerState, fromCustomer.getDetailLoaded);
export const getDetailFailed = createSelector(getCustomerState, fromCustomer.getDetailFailed);
