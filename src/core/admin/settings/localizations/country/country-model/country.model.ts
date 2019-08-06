/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CountryForm {
    public name: String;
    public isoCode2: string;
    public isoCode3: String;
    public postcodeRequired: number;
    public countryId: number;
    public status: number;


    constructor(countryForm: any) {
        this.name = countryForm.countryname || '';
        this.isoCode2 = countryForm.isocode1 || '';
        this.isoCode3 = countryForm.isocode2 || '';
        this.postcodeRequired = countryForm.postcodeRequired || 0;
        this.status = countryForm.status || 0;
        if (countryForm && countryForm.id) {
            this.countryId = countryForm.id || 0;
        }

    }
}
