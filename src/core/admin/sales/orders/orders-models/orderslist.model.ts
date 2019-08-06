/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class OrderslistModel {


    public limit: number;
    public offset: number;
    public orderId: string;
    public customerName: string;
    public totalAmount: string;
    public dateAdded: string;
    public keyword: string;
    public count: number;
    public orderStatusId: string;

    constructor(OrdersListForm: any) {
        this.limit = OrdersListForm.limit || 0;
        this.offset = OrdersListForm.offset || 0;
        this.orderId = OrdersListForm.orderId || '';
        this.totalAmount = OrdersListForm.totalAmount || '';
        this.dateAdded = OrdersListForm.dateAdded || '';
        this.keyword = OrdersListForm.keyword || '';
        this.customerName = OrdersListForm.customerName || '';
        this.count = OrdersListForm.count || 0;
        this.orderStatusId = OrdersListForm.orderStatusId || '';
    }
}
