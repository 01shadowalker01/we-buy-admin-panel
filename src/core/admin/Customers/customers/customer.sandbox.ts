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
import {Store} from '@ngrx/store';
import * as store from '../../../app.state.interface';
import {Router} from '@angular/router';
import * as customerAction from './customer-action/customers.action';
import {
    getaddaddressadd,
    getaddaddressdelete,
    getaddaddresslist,
    getaddaddresspagination,
    getaddaddressupdate,
    getaddFailed,
    getaddLoaded,
    getaddLoading,
    getaddressaddFailed,
    getaddressaddLoaded,
    getaddressaddLoading,
    getaddresscountFailed,
    getaddresscountLoaded,
    getaddresscountLoading,
    getaddressdeleteFailed,
    getaddressdeleteLoaded,
    getaddressdeleteLoading,
    getaddresslistFailed,
    getaddresslistLoaded,
    getaddresslistLoading,
    getaddressupdateFailed,
    getaddressupdateLoaded,
    getaddressupdateLoading,
    getcountFailed,
    getcountLoaded,
    getcountLoading,
    getcustomerslist,
    getdeletecustomer,
    getdeleteFailed,
    getdeleteLoaded,
    getdeleteLoading, getDetailCustomer, getDetailFailed, getDetailLoaded, getDetailLoading,
    getlistFailed,
    getlistLoaded,
    getlistLoading,
    getnewcustomer,
    getpagination,
    getupdatecustomers,
    getupdateFailed,
    getupdateLoaded,
    getupdateLoading,
} from './customer-reducer/customer.selector';
import {Subscription} from 'rxjs/index';
import {ToastrManager} from 'ng6-toastr-notifications';
import {CustomerForm} from './customer-model/customerform.model';
import {CustomerListForm} from './customer-model/customerlistform.model';
import {AddAddressListForm} from './customer-model/addAddresslistform.model';
import {AddAddressForm} from './customer-model/addAddressform.model';

@Injectable()
export class CustomerSandbox {

    private subscriptions: Array<Subscription> = [];

    /*customer*/
    public getCustomerlist$ = this.appState.select(getcustomerslist);
    public getlistLoading$ = this.appState.select(getlistLoading);
    public getlistLoaded$ = this.appState.select(getlistLoaded);
    public getlistFailed$ = this.appState.select(getlistFailed);

    public getaddcustomer$ = this.appState.select(getnewcustomer);
    public getaddLoading$ = this.appState.select(getaddLoading);
    public getaddLoaded$ = this.appState.select(getaddLoaded);
    public getaddFailed$ = this.appState.select(getaddFailed);

    public getupdatecustomer$ = this.appState.select(getupdatecustomers);
    public getupdateLoading$ = this.appState.select(getupdateLoading);
    public getupdateLoaded$ = this.appState.select(getupdateLoaded);
    public getupdateFailed$ = this.appState.select(getupdateFailed);

    public getdeletecustomer$ = this.appState.select(getdeletecustomer);
    public getdeleteLoading$ = this.appState.select(getdeleteLoading);
    public getdeleteLoaded$ = this.appState.select(getdeleteLoaded);
    public getdeleteFailed$ = this.appState.select(getdeleteFailed);

    public getpagination$ = this.appState.select(getpagination);
    public getcountLoading$ = this.appState.select(getcountLoading);
    public getcountLoaded$ = this.appState.select(getcountLoaded);
    public getcountFailed$ = this.appState.select(getcountFailed);


    /* address*/

    public getaddaddresslist$ = this.appState.select(getaddaddresslist);
    public getaddresslistLoading$ = this.appState.select(getaddresslistLoading);
    public getaddresslistLoaded$ = this.appState.select(getaddresslistLoaded);
    public getaddresslistFailed$ = this.appState.select(getaddresslistFailed);

    public getaddaddressAdd$ = this.appState.select(getaddaddressadd);
    public getaddressaddLoading$ = this.appState.select(getaddressaddLoading);
    public getaddressaddLoaded$ = this.appState.select(getaddressaddLoaded);
    public getaddressaddFailed$ = this.appState.select(getaddressaddFailed);

    public getaddaddressUpdate$ = this.appState.select(getaddaddressupdate);
    public getaddressupdateLoading$ = this.appState.select(getaddressupdateLoading);
    public getaddressupdateLoaded$ = this.appState.select(getaddressupdateLoaded);
    public getaddressupdateFailed$ = this.appState.select(getaddressupdateFailed);

    public getaddaddressDelete$ = this.appState.select(getaddaddressdelete);
    public getaddressdeleteLoading$ = this.appState.select(getaddressdeleteLoading);
    public getaddressdeleteLoaded$ = this.appState.select(getaddressdeleteLoaded);
    public getaddressdeleteFailed$ = this.appState.select(getaddressdeleteFailed);

    public getaddaddresspagelength$ = this.appState.select(getaddaddresspagination);
    public getaddresscountLoading$ = this.appState.select(getaddresscountLoading);
    public getaddresscountLoaded$ = this.appState.select(getaddresscountLoaded);
    public getaddresscountFailed$ = this.appState.select(getaddresscountFailed);


    public getDetailCustomer$ = this.appState.select(getDetailCustomer);
    public getDetailLoading$ = this.appState.select(getDetailLoading);
    public getDetailLoaded$ = this.appState.select(getDetailLoaded);
    public getDetailFailed$ = this.appState.select(getDetailFailed);

    constructor(
        protected appState: Store<store.AppState>,
        private router: Router, private toastr: ToastrManager) {
        this.subscripe();
    }


    public customerList(value) {
        this.appState.dispatch(new customerAction.DoCustomersListAction(new CustomerListForm(value)));
    }


    public PaginationCustomer(value) {
        this.appState.dispatch(new customerAction.DoPaginationCustomersListAction(new CustomerListForm(value)));
    }


    public addCustomers(value) {
        this.appState.dispatch(new customerAction.DoAddCustomersListAction(new CustomerForm(value)));
    }


    public updateCustomers(value) {
        this.appState.dispatch(new customerAction.DoUpdateCustomerAction(new CustomerForm(value)));
    }

    public deleteCustomers(value) {
        this.appState.dispatch(new customerAction.DoDeleteCustomerAction(value));
    }


    // Add Address
    public addAddressList(value) {
        this.appState.dispatch(new customerAction.DoAddAddressListAction(new AddAddressListForm(value)));
    }

    public addAddresspagination(value) {
        this.appState.dispatch(new customerAction.DoAddAddressPaginationtAction(new AddAddressListForm(value)));
    }

    // Add Address Add
    public addAddressAdd(value) {
        this.appState.dispatch(new customerAction.DoAddAddressAddAction(new AddAddressForm(value)));
    }

    public updateAddressAdd(value) {
        this.appState.dispatch(new customerAction.DoAddAddressUpdateAction(new AddAddressForm(value)));
    }

    public deleteAddressAdd(value) {
        this.appState.dispatch(new customerAction.DoDeleteAddAddressAction((value)));
    }

    public ViewCustomerDetail(value) {
        this.appState.dispatch(new customerAction.DoCustomerDetailAction((value)));
    }

    subscripe() {
        this.subscriptions.push(this.getaddcustomer$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/customers/customer']);
            }
        }));
        this.subscriptions.push(this.getupdatecustomer$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/customers/customer']);
            }
        }));

        this.subscriptions.push(this.getDetailCustomer$.subscribe(data => {
        }));
        this.subscriptions.push(this.getaddaddresspagelength$.subscribe(data => {
        }));


    }

}
