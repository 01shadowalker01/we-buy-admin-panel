/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CurrencyNewForm {
    public title: string;
    public code: string;
    public symbolLeft: string;
    public symbolRight: string;
    public value: number;
    public status: number;
    public currencyId: number;

    constructor(currencyNewForm: any) {
        this.title = currencyNewForm.title || '';
        this.code = currencyNewForm.code || '';
        this.symbolLeft = currencyNewForm.symbolLeft || '';
        this.symbolRight = currencyNewForm.symbolRight || '';
        this.value = currencyNewForm.value || 0;
        this.status = currencyNewForm.status || 0;
        if (currencyNewForm.currencyId) {
            this.currencyId = currencyNewForm.currencyId || '';
        }
    }
}
