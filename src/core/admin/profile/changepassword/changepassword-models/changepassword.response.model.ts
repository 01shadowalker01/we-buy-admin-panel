/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
export class ChangepasswordResponseModel {
    public user: any = {};

    constructor(changepasswordResponse: any) {
        this.user = changepasswordResponse || '';
    }

}
