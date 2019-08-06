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
import {OrdersSandbox} from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import {OrderstatusSandbox} from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';


@Component({
    selector: 'app-sales-order-list',
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.css'],
})

export class OrderListComponent implements OnInit {
    public pageSize = '5';
    public pageSizeOptions = [5, 10, 20];
    public page: any;
    public currentPage: number;
    public index: number;
    public buttonCheck = true;
    public pagination = true;
    public offset: number;
    private orderId: number;
    private customerName: string;
    private totalAmount: number;
    private dateAdded: any;

    constructor(private router: Router,
                public appSandbox: OrdersSandbox, public orderStatusSandbox: OrderstatusSandbox) {

    }

    ngOnInit() {
        this.offset = 0;
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.getOrderList(0);
        this.index = 0;
        this.getOrderStatusList();

    }

    changeFilter(event) {
        this.buttonCheck = event.target.checked;
    }

    getOrderList(offset: number = 0) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = this.offset;
        params.orderId = this.orderId;
        params.customerName = this.customerName;
        params.totalAmount = this.totalAmount;
        params.dateAdded = this.dateAdded;
        this.appSandbox.getOrderList(params);
        if (this.pagination) {
            params.count = 'true';
            this.appSandbox.getOrderPagination(params);
        }
    }

    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.offset = event.pageSize * event.pageIndex;
        this.getOrderList(this.offset);
    }

    viewOrders(orderId) {
        this.router.navigate(['/sales/orders/vieworder', orderId]);
    }

    // receive param from filter component .And calls categoriesPagination event
    receiveProgress(event) {
        this.index = 0;
        this.orderId = event.orderId;
        this.customerName = event.customerName;
        this.totalAmount = event.totalAmount;
        this.dateAdded = event.dateAdded;
        this.offset = event.offset;
        this.pageSize = event.limit;
        this.getOrderPaginationcount();

    }

    getOrderPaginationcount() {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = this.offset;
        params.orderId = this.orderId;
        params.customerName = this.customerName;
        params.totalAmount = this.totalAmount;
        params.dateAdded = this.dateAdded;
        params.count = 'true';
        this.appSandbox.getOrderPagination(params);
    }

    getOrderStatusList() {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = 0;
        params.keyword = '';
        this.orderStatusSandbox.getorderstatuslist(params);
    }


}
