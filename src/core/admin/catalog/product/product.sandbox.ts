/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Injectable} from '@angular/core';
// store
import {Store} from '@ngrx/store';
// actions
import * as productActions from './product-action/product.action';
// app state
import * as store from '../../../app.state.interface';
// router
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
// notifications
import {ToastrManager} from 'ng6-toastr-notifications';

import {
    // product add selectors
    getProductAdd,
    ProductAddFailed,
    ProductAddLoaded,
    ProductAddLoading,
    // product count selectors
    getProductCount,
    ProductCountFailed,
    ProductCountLoaded,
    ProductCountLoading,
    // product delete selectors
    getProductDelete,
    ProductDeleteFailed,
    ProductDeleteLoaded,
    ProductDeleteLoading,
    // product details selectors
    getProductAddDetail,
    getProductDetails,
    ProductDetailFailed,
    ProductDetailLoaded,
    ProductDetailLoading,
    // product list selectors
    getProductList,
    ProductListFailed,
    ProductListLoaded,
    ProductListLoading,
    // product update selectors
    getProductUpdate,
    ProductUpdateFailed,
    ProductUpdateLoaded,
    ProductUpdateLoading,
    // product add List
    getProductAddListRequestLoading,
    getProductAddListResponse,
    getProductAddListRequestFailed,
    getProductAddListRequestLoaded,
    // product remove List
    getProductRemoveListResponse,
    getProductRemoveListRequestLoading,
    getProductRemoveListRequestLoaded,
    getProductRemoveListRequestFailed
} from './product-reducer/product.selector';
import {ProductListModel} from './product-model/Product-list.model';
import {ProductDeleteModel} from './product-model/product-delete.model';
import {ProductAddModel} from './product-model/Product-add.model';
import {ProductUpdateModel} from './product-model/Product-update.model';
import {DetailModel} from './product-model/detail.model';


@Injectable()
export class ProductSandbox {

    public productList$ = this.appState.select(getProductList);
    public productCount$ = this.appState.select(getProductCount);
    public deletedProduct$ = this.appState.select(getProductDelete);
    public productAdd$ = this.appState.select(getProductAdd);
    public productAddDetail$ = this.appState.select(getProductAddDetail);
    public productUpdate$ = this.appState.select(getProductUpdate);
    public productDetails$ = this.appState.select(getProductDetails);

    public productDetailLoading$ = this.appState.select(ProductDetailLoading);
    public productDetailLoaded$ = this.appState.select(ProductDetailLoaded);
    public productDetailFailed$ = this.appState.select(ProductDetailFailed);

    public productListLoading$ = this.appState.select(ProductListLoading);
    public productListLoaded$ = this.appState.select(ProductListLoaded);
    public productListFailed$ = this.appState.select(ProductListFailed);

    public productDeleteLoading$ = this.appState.select(ProductDeleteLoading);
    public productDeleteLoaded$ = this.appState.select(ProductDeleteLoaded);
    public productDeleteFailed$ = this.appState.select(ProductDeleteFailed);

    public productCountLoading$ = this.appState.select(ProductCountLoading);
    public productCountLoaded$ = this.appState.select(ProductCountLoaded);
    public productCountFailed$ = this.appState.select(ProductCountFailed);

    public productAddLoading$ = this.appState.select(ProductAddLoading);
    public productAddLoaded$ = this.appState.select(ProductAddLoaded);
    public productAddFailed$ = this.appState.select(ProductAddFailed);

    public productUpdateLoading$ = this.appState.select(ProductUpdateLoading);
    public productUpdateLoaded$ = this.appState.select(ProductUpdateLoaded);
    public productUpdateFailed$ = this.appState.select(ProductUpdateFailed);

    public getProductAddResponse$ = this.appState.select(getProductAddListResponse);
    public getProductAddRequestLoading$ = this.appState.select(getProductAddListRequestLoading);
    public getProductAddRequestLoaded$ = this.appState.select(getProductAddListRequestLoaded);
    public getProductAddRequestFailed$ = this.appState.select(getProductAddListRequestFailed);

    public getProductRemoveResponse$ = this.appState.select(getProductRemoveListResponse);
    public getProductRemoveRequestLoading$ = this.appState.select(getProductRemoveListRequestLoading);
    public getProductRemoveRequestLoaded$ = this.appState.select(getProductRemoveListRequestLoaded);
    public getProductRemoveRequestFailed$ = this.appState.select(getProductRemoveListRequestFailed);


    private subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>, private router: Router, private toastr: ToastrManager) {
        this.subscribe();
    }


    public getProductList(value) {
        this.appState.dispatch(new productActions.GetProductlistAction(new ProductListModel(value)));
    }


    public getProductCount(value) {
        this.appState.dispatch(new productActions.GetProductCountAction(new ProductListModel(value)));

    }


    public doProductDelete(value) {
        this.appState.dispatch(new productActions.DoProductDeleteAction(new ProductDeleteModel(value)));
    }


    public doProductAdd(value) {

        this.appState.dispatch(new productActions.DoProductAddAction(new ProductAddModel(value)));
    }


    public doProductUpdate(value) {
        this.appState.dispatch(new productActions.DoProductUpdateAction(new ProductUpdateModel(value)));
    }


    public getProductDetail(value) {
        this.appState.dispatch(new productActions.GetProductDetailAction(new DetailModel(value)));
    }


    public productIsFeature(value) {
        this.appState.dispatch(new productActions.DoProductDetailIsFeatureAction((value)));
    }

    public productAddList(value) {
        this.appState.dispatch(new productActions.DoProductaddlistAction((value)));
    }

    public productRemoveList(value) {
        this.appState.dispatch(new productActions.DoProductremovelistAction((value)));
    }

    public productTodayDeals(value) {
        this.appState.dispatch(new productActions.DoProductTodayDealAction((value)));
    }


    subscribe() {
        this.productAdd$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/catalog/product']);
            }
        });

        this.productUpdate$.subscribe(data => {
            if (data && data['status'] === 1) {
                this.router.navigate(['/catalog/product']);
            }
        });

    }

}


