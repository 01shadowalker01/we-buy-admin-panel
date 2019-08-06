/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as actions from '../customer-action/customers.action';
import {catchError} from 'rxjs/internal/operators';
import {CustomersApiClientService} from '../customer.ApiClient.service';
import {CustomerFormResponseModel} from '../customer-model/customerform.response.model';
import {AddAddressListResponseForm} from '../customer-model/addAddresslistform.response.model';
import {AddAddressResponseForm} from '../customer-model/addAddressform.response.model';


@Injectable()
export class Customereffects {

    constructor(private action$: Actions, private Service: CustomersApiClientService) {
    }

    // Customer list
    @Effect()
    docatlists$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_Customers_List),
            map((action: actions.DoCustomersListAction) => action.payload),
            switchMap((state) => {
                return this.Service.customersList(state)
                    .pipe(
                        switchMap((customers) => [
                            new actions.DoCustomerslistSuccessAction((customers)),
                        ]),
                        catchError(error => of(new actions.DoCustomerslistFailAction(error)))
                    );
            })
        );
    // customerList Pagination
    @Effect()
    doPginationcustomers$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_PAGINATION_CUSTOMER_List),
            map((action: actions.DoCustomersListAction) => action.payload),
            switchMap((state) => {
                return this.Service.customersList(state)
                    .pipe(
                        switchMap((customers) => [
                            new actions.DoPaginationCustomersSuccessAction((customers)),
                        ]),
                        catchError(error => of(new actions.DoPaginationCustomersFailAction(error)))
                    );
            })
        );
    // Add customer
    @Effect()
    doADDcustomers$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_Customers_Action),
            map((action: actions.DoAddCustomersListAction) => action.payload),
            switchMap((state) => {
                return this.Service.addcustomer(state)
                    .pipe(
                        switchMap((customers) => [
                            new actions.DoAddCustomersListActionSuccess((customers)),
                        ]),
                        catchError(error => of(new actions.DoAddCustomersListFailAction(error)))
                    );
            })
        );
    // update Customer
    @Effect()
    doupdateCustomer$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_UPDATE_CUSTOMER_ACTION),
            map((action: actions.DoUpdateCustomerAction) => action.payload),
            switchMap((state) => {

                return this.Service.updatecustomer(state)
                    .pipe(
                        switchMap((user) => {
                            return [
                                new actions.DoUpdateCustomerSuccess(user),

                            ];
                        }),
                        catchError(error => of(new actions.DoUpdateCustomerFail(error)))
                    );
            })
        );

    // delete customer
    @Effect()
    doCustomerDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_DELETE_CUSTOMER_ACTION),
            map((action: actions.DoDeleteCustomerAction) => action.payload),
            switchMap((state) => {
                const customerId = state.customerId;

                return this.Service.deleteCustomer(state, customerId)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoDeleteCustomerSuccess((user)),
                        ]),
                        catchError(error => of(new actions.DoDeleteCustomerFail(error)))
                    );
            })
        );

    // Add Address List
    @Effect()
    doaddaddressList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_ADDRESS_LIST_ACTION),
            map((action: actions.DoAddAddressListAction) => action.payload),
            switchMap((state) => {
                const custId = state.customerId;
                return this.Service.addAddressList(state, custId)
                    .pipe(
                        switchMap((customers) => [
                            new actions.DoAddAddressListSuccess(((customers))),
                        ]),
                        catchError(error => of(new actions.DoAddAddressListFail(error)))
                    );
            })
        );

    // Add Address Pagination
    @Effect()
    doaddaddressListPagination$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_ACTION),
            map((action: actions.DoAddAddressPaginationtAction) => action.payload),
            switchMap((state) => {
                const custId = state.customerId;

                return this.Service.addAddressPagination(state, custId)
                    .pipe(
                        switchMap((address) => [
                            new actions.DoAddAddressPaginationSuccess(((address))),
                        ]),
                        catchError(error => of(new actions.DoAddAddressPaginationFail(error)))
                    );
            })
        );

    // Add Address Add
    @Effect()
    doAddressAdd$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_ADDRESS_ADD_ACTION),
            map((action: actions.DoAddAddressAddAction) => action.payload),
            switchMap((state) => {
                return this.Service.addaddressAdd(state)
                    .pipe(
                        switchMap((customers) => [
                            new actions.DoAddAddressAddSuccess((customers)),
                        ]),
                        catchError(error => of(new actions.DoAddAddressAddFail(error)))
                    );
            })
        );
    // Add Address Update

    @Effect()
    doaddaddressUpadte$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_ACTION),
            map((action: actions.DoAddAddressUpdateAction) => action.payload),
            switchMap((state) => {

                return this.Service.updateAddAddress(state)
                    .pipe(
                        switchMap((user) => {
                            return [
                                new actions.DoAddAddressUpdateSuccess(new AddAddressResponseForm(user)),
                            ];
                        }),
                        catchError(error => of(new actions.DoAddAddressUpdateFail(new CustomerFormResponseModel(error))))
                    );
            })
        );

    // delete customer Address
    @Effect()
    doAddAddressDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_ADDRESS_DELETE_ACTION),
            map((action: actions.DoDeleteAddAddressAction) => action.payload),
            switchMap((state) => {
                const addressId = state.addressId;
                return this.Service.deleteAddAddress(state, addressId)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoDeleteAddAddressSuccess((user)),
                        ]),
                        catchError(error => of(new actions.DoDeleteAddAddressFail(error)))
                    );
            })
        );


    // Customer  Detail  Effect
    @Effect()
    doCustomerDeatail$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_CUSTOMER_DETAIL_ACTION),
            map((action: actions.DoCustomerDetailAction) => action.payload),
            switchMap((state) => {
                const Id = state.id;
                return this.Service.customerDetail(state, Id)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoCustomerDetailSuccess((user)),
                        ]),
                        catchError(error => of(new actions.DoCustomerDetailFail(error)))
                    );
            })
        );
}
