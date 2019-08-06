/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class LanguageListForm {
    public limit: string;
    public offset: string;
    public count: boolean;
    public keyword: string;
    public status: string;

    constructor(fromLanguageList: any) {
        this.limit = fromLanguageList.limit || '';
        this.offset = fromLanguageList.offset || '';
        this.count = fromLanguageList.count || false;
        this.keyword = fromLanguageList.keyword || '';
        this.status = fromLanguageList.status || '';
    }
}



