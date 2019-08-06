/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class AddAddressListForm {

    public limit: number;
    public offset: number;
    public count: string;
    public customerId: number;


    constructor(addaddresslist: any) {
        this.limit = addaddresslist.limit || 0;
        this.offset = addaddresslist.offset || 0;
        this.count = addaddresslist.count || '';
        this.customerId = addaddresslist.customerId || 0;


    }
}
