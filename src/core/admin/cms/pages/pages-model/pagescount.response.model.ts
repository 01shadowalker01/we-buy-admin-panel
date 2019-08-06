/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
export class PagescountResponseModel {

    public pagescount: any = {};

    constructor(listResponse: any) {

        this.pagescount = listResponse || '';

    }

}
