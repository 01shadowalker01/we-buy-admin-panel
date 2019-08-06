/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {environment} from '../environments/environment';
import * as fromAuth from './admin/auth/reducer/auth.reducer';
import * as fromCommon from './admin/logout/reducer/common.reducer';
import * as fromProduct from './admin/catalog/product/product-reducer/product.reducer';
import * as fromorder from './admin/settings/localizations/orderstatus/orderstatus-reducer/orderstatus.reducer';
import * as fromCustomers from './admin/Customers/customers/customer-reducer/customer.reducer';
import * as fromCountry from './admin/settings/localizations/country/country-reducer/country.reducer';
import * as fromZone from './admin/settings/localizations/zone/zone-reducer/zone.reducer';
import * as fromRole from './admin/settings/role/role-reducer/role.reducer';
import * as fromPages from './admin/cms/pages/pages-reducer/pages.reducer';
import * as fromUser from './admin/settings/user/user-reducer/user.reducer';
import * as fromBanner from './admin/cms/banners/banner-reducer/banner.reducer';
import * as fromBrand from './admin/catalog/brand/reducer/brand.reducer';
import * as fromLanguage from './admin/settings/localizations/languages/languages-reducer/languages.reducer';
import * as fromEmailtemp from './admin/settings/localizations/emailtemplate/emailtemp-reducer/emailtemp.reducer';
import * as fromStockstatus from './admin/settings/localizations/stockStatus/stock-reducer/stock.reducer';
import * as fromSalesorder from './admin/sales/orders/orders-reducer/orders.reducer';
import * as fromEditprofile from './admin/profile/editprofile/reducer/editprofile.reducer';
import * as fromCurrency from './admin/settings/localizations/currency/currency-reducer/currency.reducer';
import * as fromChangepassword from './admin/profile/changepassword/changepassword-reducer/changepassword.reducer';
import * as fromCategories from './admin/catalog/category/reducer/categories.reducer';
import * as fromMedia from './admin/catalog/media/reducer/media.reducer';
import * as fromDashboard from './admin/dashboard/reducer/dashboard.reducer';
import * as fromGeneralSetting from './admin/settings/generalsetting/generalsetting-reducer/generalsetting.reducer';
import * as fromSocial from './admin/settings/siteSettings/social/social-reducer/social.reducer';
import * as fromseoSetting from './admin/settings/siteSettings/seo/seo-reducer/seo-reducer';
import * as fromLayoutCatalog from './admin/catalog/layout/reducer/layout.reducer';
import * as fromLayoutCustomer from './admin/Customers/layout/reducer/layout.reducer';
import * as fromLayoutSales from './admin/sales/layout/reducer/layout.reducer';
import * as fromPersonalizeProduct from './admin/settings/personalize/product/product-reducer/product-reducer';
import * as fromPersonalizeOrder from './admin/settings/personalize/order/order-reducer/order-reducer';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';

import {AppState as State} from './app.state.interface';
import {reduce} from 'rxjs/operators';
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    common: fromCommon.reducer,
    media: fromMedia.reducer,
    categories: fromCategories.reducer,
    product: fromProduct.reducer,
    changepassword: fromChangepassword.reducer,
    customer: fromCustomers.reducer,
    orderStatus: fromorder.reducer,
    country: fromCountry.reducer,
    zone: fromZone.reducer,
    role: fromRole.reducer,
    pages: fromPages.reducer,
    user: fromUser.reducer,
    banner: fromBanner.reducer,
    brand: fromBrand.reducer,
    language: fromLanguage.reducer,
    emailtemp: fromEmailtemp.reducer,
    stockstatus: fromStockstatus.reducer,
    salesorder: fromSalesorder.reducer,
    editprofile: fromEditprofile.reducer,
    currency: fromCurrency.reducer,
    dashboard: fromDashboard.reducer,
    generalsetting: fromGeneralSetting.reducer,
    social: fromSocial.reducer,
    seosetting: fromseoSetting.reducer,
    catalogLayout: fromLayoutCatalog.reducer,
    customerLayout: fromLayoutCustomer.reducer,
    salesLayout: fromLayoutSales.reducer,
    personalizeProduct: fromPersonalizeProduct.reducer,
    personalizeOrder: fromPersonalizeOrder.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
    return function (state: State, action: any): State {
        if (action.type === '[Common] Do Clear') {
            state = undefined;
        }
        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To filter more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger]
    : [];
