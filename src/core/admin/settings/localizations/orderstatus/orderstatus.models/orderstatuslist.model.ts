/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderStatusListForm {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: boolean;

    constructor(orderstatuslistForm: any) {
        this.limit = orderstatuslistForm.limit || 0;
        this.offset = orderstatuslistForm.offset || 0;
        this.keyword = orderstatuslistForm.keyword || '';
        this.count = false;

    }
}
