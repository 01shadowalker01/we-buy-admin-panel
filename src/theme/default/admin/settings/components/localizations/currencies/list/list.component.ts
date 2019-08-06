/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CurrencySandbox} from '../../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import {CurrencyService} from '../../../../../../../../core/admin/settings/localizations/currency/currency.service';

@Component({
    selector: 'app-spurt-currencylist',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class CurrencyListComponent implements OnInit {

    public pageSize: any = 5;
    private pageoffset: number;
    private editedCurrencyValue: any = {};
    private popoverContent: any;

    constructor(public sandbox: CurrencySandbox,
                private currencyService: CurrencyService,
                private router: Router) {
        this.regSubscribeEvents();
    }

    // initially calls the currencyList,countPaginationApi
    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.currencyList();
        this.countPaginationApi();
    }

    // Add Currency Navigate to Add Form
    addCurrency() {
        this.currencyService.setEditedValue('');
        this.router.navigate(['/settings/currency/add']);
    }


    /**
     * Handles form 'list' event. Calls sandbox Currency List function.
     *
     * @param params storing entire value
     */
    currencyList(offset: any = 0) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = '';
        params.count = '';
        this.sandbox.getCurrencyList(params);

    }

    /**
     * Handles form 'list' event. Calls sandbox Currency List Pagination count function.
     *
     * @param params storing entire value
     */
    countPaginationApi() {
        const params: any = {};
        params.limit = 5;
        params.offset = '';
        params.keyword = '';
        params.count = 1;
        this.sandbox.getCurrencyListCount(params);
    }

    // Pagination Function
    onPageChange(event) {
        this.pageoffset = (event.pageSize * event.pageIndex);
        this.pageSize = event.pageSize;
        this.currencyList(this.pageoffset);
        this.currencyService.deletePagerefresh(this.pageoffset);
    }

    // Edit Currency Navigate to Add Form
    editCurrency(value: any) {
        this.editedCurrencyValue = this.currencyService.setEditedValue(value);
        this.router.navigate(['/settings/currency/edit', value.currencyId]);
    }

    // Delete Currency using CurrencyId
    deleteCurrency(currencyId, deletePop) {
        event.stopPropagation();
        this.popoverContent = deletePop;
        this.sandbox.deleteCurrency({currencyId: currencyId});
    }

    // Delete Currency Afetr Subscribe
    regSubscribeEvents() {
        this.sandbox.getCurrencyDelete$.subscribe(_delete => {
            if (_delete && _delete.status === 1) {
                this.currencyList(this.pageoffset);
                this.countPaginationApi();
            }
        });
    }
}
