/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class LanguagesListResponseModel {
    public languageId: number;
    public name: string;
    public code: string;
    public image: string;
    public imagePath: string;
    public sortOrder: number;
    public isActive: number;

    constructor(languageFormResponse: any) {
        this.languageId = languageFormResponse.languageId || 0;
        this.name = languageFormResponse.name || '';
        this.code = languageFormResponse.code || '';
        this.image = languageFormResponse.image || '';
        this.imagePath = languageFormResponse.imagePath || '';
        this.sortOrder = languageFormResponse.sortOrder || 0;
        this.isActive = languageFormResponse.isActive || 0;
    }
}


