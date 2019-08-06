/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BannercountModel {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: string;


    constructor(bannercountForm: any) {
        this.limit = bannercountForm.limit || 0;
        this.offset = bannercountForm.offset || 0;
        this.keyword = bannercountForm.keyword || '';
        this.count = bannercountForm.count || '';

    }
}
