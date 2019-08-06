/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class LanguagesResponseModel {
    public languageId: string;
    public name: string;
    public code: string;
    public image: string;
    public imagePath: string;
    public sortOrder: string;
    public isActive: string;

    constructor(countryFormResponse: any) {

        this.languageId = countryFormResponse.countryId || '';
        this.name = countryFormResponse.name || '';
        this.code = countryFormResponse.code || '';
        this.image = countryFormResponse.image || '';
        this.imagePath = countryFormResponse.imagePath || '';
        this.sortOrder = countryFormResponse.sortOrder || '';
        this.isActive = countryFormResponse.isActive || '';
    }
}
