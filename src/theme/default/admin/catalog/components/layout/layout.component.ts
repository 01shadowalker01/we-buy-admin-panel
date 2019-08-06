/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
    Component,
    ChangeDetectionStrategy, OnInit
} from '@angular/core';
import {LayoutSandbox} from '../../../../../../core/admin/catalog/layout/layout.sandbox';
import {BrandSandbox} from '../../../../../../core/admin/catalog/brand/brand.sandbox';
import {transition} from '@angular/animations';

@Component({
    selector: 'app-catalog-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLayoutComponent implements OnInit {

    constructor(public layoutSandbox: LayoutSandbox, public brandSandbox: BrandSandbox) {
    }

    /**
     * Handles form 'ngOnInit' event. calls layoutSandbox(getProductListCount,getActiveProductListCount
     *getInActiveProductListCount,getCatagoryListCount,getFeaturedProductListCount).
     *
     * @param count default value.
     * @param status default value.
     */
    ngOnInit() {
        this.layoutSandbox.getProductListCount({count: true});
        this.layoutSandbox.getActiveProductListCount({status: '1', count: true});
        this.layoutSandbox.getInActiveProductListCount({status: '0', count: true});
        this.layoutSandbox.getCatagoryListCount({count: true});
        this.layoutSandbox.getFeaturedProductListCount({count: true});
        this.brandSandbox.manufacturerCountList({count: true});
    }

}
