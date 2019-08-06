/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class RoleListModel {

    public limit: number;
    public offset: number;
    public keyword: string;
    public count: number;


    constructor(rolelistForm: any) {
        this.limit = rolelistForm.limit || 0;
        this.offset = rolelistForm.offset || 0;
        this.keyword = rolelistForm.keyword || '';
        this.count = rolelistForm.count || 0;

    }
}
