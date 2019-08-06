/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
export class PageslistModel {


    public limit: number;
    public offset: number;
    public keyword: string;

    constructor(PagesListForm: any) {
        this.limit = PagesListForm.limit || 0;
        this.offset = PagesListForm.offset || 0;
        this.keyword = PagesListForm.keyword || '';
    }
}
