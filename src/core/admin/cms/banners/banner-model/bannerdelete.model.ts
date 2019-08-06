/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BannerdeleteModel {

    public bannerId: number;

    constructor(deletebanner: any) {
            this.bannerId = deletebanner.bannerId || '';
    }
}
