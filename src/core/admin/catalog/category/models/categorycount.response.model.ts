/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CategorycountResponseModel {

    public user: any = {};

    constructor(categorycountResponse: any) {

        this.user = categorycountResponse || '';

    }

}
