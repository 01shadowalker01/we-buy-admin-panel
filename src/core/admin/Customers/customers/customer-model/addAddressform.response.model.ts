/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class AddAddressResponseForm {


    public address1: string;
    public address2: string;
    public addressType: number;
    public city: string;
    public postcode: number;
    public state: string;
    public customerId: number;
    public addressId: number;


    constructor(addaddressresponseform: any) {
        this.address1 = addaddressresponseform.address1 || '';
        this.address2 = addaddressresponseform.address2 || '';
        this.city = addaddressresponseform.city || '';
        this.postcode = addaddressresponseform.pincode || '';
        this.state = addaddressresponseform.state || '';
        this.customerId = addaddressresponseform.customerId || '';
        this.addressType = addaddressresponseform.addresstype || '';
        this.addressId = addaddressresponseform.addressId || '';
    }


}
