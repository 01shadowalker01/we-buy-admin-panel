/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {AppState} from '../../../../app.state.interface';
import {createSelector} from 'reselect';
import * as fromProduct from './product.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProdState = (state: AppState) => state.product;
// product list action
export const getProductList = createSelector(getProdState, fromProduct.getProductList);
export const ProductListLoading = createSelector(getProdState, fromProduct.getProductListLoading);
export const ProductListLoaded = createSelector(getProdState, fromProduct.getProductListLoaded);
export const ProductListFailed = createSelector(getProdState, fromProduct.getProductListFailed);

// product count action
export const getProductCount = createSelector(getProdState, fromProduct.getProductCount);
export const ProductCountLoading = createSelector(getProdState, fromProduct.getProductCountLoading);
export const ProductCountLoaded = createSelector(getProdState, fromProduct.getProductCountLoaded);
export const ProductCountFailed = createSelector(getProdState, fromProduct.getProductCountFailed);

// product delete action
export const getProductDelete = createSelector(getProdState, fromProduct.getProductDelete);
export const ProductDeleteLoading = createSelector(getProdState, fromProduct.getProductDeleteLoading);
export const ProductDeleteLoaded = createSelector(getProdState, fromProduct.getProductDeleteLoaded);
export const ProductDeleteFailed = createSelector(getProdState, fromProduct.getProductDeleteFailed);

// product add action
export const getProductAdd = createSelector(getProdState, fromProduct.getProductAdd);
export const ProductAddLoading = createSelector(getProdState, fromProduct.getProductAddLoading);
export const ProductAddLoaded = createSelector(getProdState, fromProduct.getProductAddLoaded);
export const ProductAddFailed = createSelector(getProdState, fromProduct.getProductAddFailed);

// product Detail action
export const getProductAddDetail = createSelector(getProdState, fromProduct.getProductAddDetail);
export const ProductDetailLoading = createSelector(getProdState, fromProduct.getProducDetailLoading);
export const ProductDetailLoaded = createSelector(getProdState, fromProduct.getProductDetailLoaded);
export const ProductDetailFailed = createSelector(getProdState, fromProduct.getProductDetailFailed);

// product update action
export const getProductUpdate = createSelector(getProdState, fromProduct.getProductUpdate);
export const getProductDetails = createSelector(getProdState, fromProduct.getProductDetail);
export const ProductUpdateLoading = createSelector(getProdState, fromProduct.getProductUpdateLoading);
export const ProductUpdateLoaded = createSelector(getProdState, fromProduct.getProductUpdateLoaded);
export const ProductUpdateFailed = createSelector(getProdState, fromProduct.getProductUpdateFailed);

// product add action
export const getProductAddListResponse = createSelector(getProdState, fromProduct.getProductAddListResponse);
export const getProductAddListRequestLoading = createSelector(getProdState, fromProduct.getProductAddListRequestLoading);
export const getProductAddListRequestLoaded = createSelector(getProdState, fromProduct.getProductAddListRequestLoaded);
export const getProductAddListRequestFailed = createSelector(getProdState, fromProduct.getProductAddListRequestFailed);
// product remove action
export const getProductRemoveListResponse = createSelector(getProdState, fromProduct.getProductRemoveListResponse);
export const getProductRemoveListRequestLoading = createSelector(getProdState, fromProduct.getProductRemoveListRequestLoading);
export const getProductRemoveListRequestLoaded = createSelector(getProdState, fromProduct.getProductRemoveListRequestLoaded);
export const getProductRemoveListRequestFailed = createSelector(getProdState, fromProduct.getProductRemoveListRequestFailed);






