/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductUpdateModel {

    public productName: string;
    public productDescription: string;
    public upc: string;
    public sku: string;
    public image: string;
    public metaTagTitle: string;
    public categoryId: string;
    public model: number;
    public location: string;
    public price: string;
    public minimumQuantity: string;
    public quantity: string;
    public subtractStock: number;
    public outOfStockStatus: number;
    public requiredShipping: number;
    public dateAvailable: string;
    public status: number;
    public sortOrder: number;
    public productId: number;
    public condition: string;
    public relatedProductId: string;
    public productOptions: Array<any>;
    public productDiscount: Array<any>;
    public productSpecial: Array<any>;



    constructor(ProdupdateForm: any) {
        this.productName = ProdupdateForm.productName || '';
        this.productDescription = ProdupdateForm.productDescription || '';
        this.upc = ProdupdateForm.upc || '';
        this.sku = ProdupdateForm.sku || '';
        this.image = ProdupdateForm.image || '';
        this.metaTagTitle = ProdupdateForm.metaTagTitle || '';
        this.categoryId = ProdupdateForm.categoryId || '';
        this.model = ProdupdateForm.model || 0;
        this.location = ProdupdateForm.location || '';
        this.price = ProdupdateForm.price || '';
        this.minimumQuantity = ProdupdateForm.minimumQuantity || '';
        this.quantity = ProdupdateForm.quantity || '';
        this.subtractStock = ProdupdateForm.subtractStock || '';
        this.outOfStockStatus = ProdupdateForm.outOfStockStatus || '';
        this.requiredShipping = ProdupdateForm.requiredShipping || '';
        this.dateAvailable = ProdupdateForm.dateAvailable || '';
        this.status = ProdupdateForm.status || 0;
        this.sortOrder = ProdupdateForm.sortOrder || 0;
        this.productId = ProdupdateForm.productId || 0;
        this.condition = ProdupdateForm.condition || '';
        this.relatedProductId = ProdupdateForm.relatedProductId || '';
        this.productOptions = ProdupdateForm.productOptions || [];
        this.productDiscount = ProdupdateForm.productDiscount || [];
        this.productSpecial = ProdupdateForm.productSpecial || [];

    }
}
