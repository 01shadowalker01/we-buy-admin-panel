/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductSandbox} from '../../../../../../../core/admin/catalog/product/product.sandbox';
import {ConfigService} from '../../../../../../../core/admin/service/config.service';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-catalog-product-list',
    templateUrl: './list.component.html',

})
export class ProductListComponent implements OnInit {
    // pagination
    public pageSize = '5';
    public keyword = '';
    public offset: number;
    public index = 0;
    public sku: any;
    public status: number;
    public price: number;
    // getProductCount
    private isCount: boolean;
    // popover
    public popoverContent: any;
    // toogle filter button
    public isActive: any = [];
    // condition for table responsive
    public buttoncheck = true;
    // image view
    public imageUrl: string;
    public productUrl: string;


    constructor(public productSandbox: ProductSandbox,
                private router: Router,
                public  modalService: NgbModal,
                public configService: ConfigService) {
    }

    /** initially calling ProductSandbox
     * getProductlist with pagination data with pagination count
     * and assigning  configService url
     * */
    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.isCount = true;
        this.ProductLists();
        // this.imageUrl = this.configService.get('resize').imageUrl;
        this.imageUrl = environment.imageUrl;
        this.productUrl = environment.productUrl;

    }

    /**
     * Handles  'getProductlist' event. Calls productSandbox getProductList,
     *  if (isCount) Calls productSandbox getProductCount.
     *
     * @param params with pagination value
     */
    ProductLists() {
        const params: any = {};
        params.offset = this.offset;
        params.limit = this.pageSize;
        params.keyword = this.keyword;
        params.sku = this.sku;
        params.status = this.status;
        params.price = this.price;
        this.productSandbox.getProductList(params);
        if (this.isCount) {
            params.limit = '';
            params.count = true;
            this.productSandbox.getProductCount(params);
        }
    }

    // open filter component
    changeFilter(event) {
        this.buttoncheck = event.target.checked;
    }

    // calls productSandbox getProductlist with pagination values
    onPageChange(event: any) {
        this.isCount = false;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.offset = event.pageSize * event.pageIndex;
        this.ProductLists();
    }

    /** calls productSandbox doProductDelete,
     * if (_delete) then calls getProductlist .
     *
     *@param params with productId from deleteProduct button .
     */
    deleteProduct(id) {
        // event.stopPropagation();
        const params: any = {};
        params.productId = id;
        this.productSandbox.doProductDelete(params);
        this.productSandbox.deletedProduct$.subscribe(_delete => {
            if (_delete) {
                if (_delete.status === 1) {
                    this.ProductLists();
                }
            }
        });
    }

    // navigation to update product with productId
    updateProduct(productId) {
        this.router.navigate(['/catalog/product/edit', productId]);
    }

    /**
     * Handles  'onFilterChange' event. Calls productSandbox productIsFeature function if FeatureValu is true,
     * else calls productSandbox productIsFeature
     *
     * @param event and prodinfo form onFilterChange input.
     *
     */
    onFilterChange(event: any, prodinfo) {
        const params: any = {};
        params.productId = prodinfo.productId;
        const FeatureValue = event.target.checked;
        if (FeatureValue === true) {
            params.isFeature = '1';

            this.productSandbox.productIsFeature(params);

        } else {
            params.isFeature = '0';

            this.productSandbox.productIsFeature(params);


        }
    }

    // receive param from filter component .And calls paginations event
    receiveProgress(event) {
        this.index = 0;
        this.paginations();
        this.keyword = event.keyword;
        this.sku = event.sku;
        this.status = event.status;
        this.price = event.price;
    }

    // calls productSandbox getProductCount with params
    paginations() {
        const params: any = {};
        params.offset = this.offset;
        params.limit = this.pageSize;
        params.keyword = '';
        params.count = true;
        this.productSandbox.getProductCount(params);
    }

    // perticular product details will show
    product_Details(id) {
        window.open(this.productUrl + 'products/productdetails/' + id);
    }

    /**
     * Handles  'todayDealsChange' event. Calls productSandbox productTodayDeals function if FeatureValue is true,
     * else calls productSandbox productTodayDeals
     *
     * @param event and prodinfo form onFilterChange input.
     *
     */
    todayDealsChange(event: any, prodinfo) {
        const params: any = {};
        params.productId = prodinfo.productId;
        const FeatureValue = event.target.checked;
        if (FeatureValue === true) {
            params.todayDeals = 1;
            this.productSandbox.productTodayDeals(params);
        } else {
            params.todayDeals = 0;
            this.productSandbox.productTodayDeals(params);
        }
    }


}
