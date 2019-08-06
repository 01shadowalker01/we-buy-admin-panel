/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../seo-action/seo-action';
import {SeosettingState, SeosettingRecordState} from './seo-state';
import {SitesettingsResponsemodel} from '../seo-model/seo-responsemodel';

export const initialState: SeosettingState = new SeosettingRecordState() as SeosettingState;

export function reducer(state = initialState, {type, payload}: any): SeosettingState {
    if (!type) {
        return state;
    }

    switch (type) {

        case actions.ActionTypes.DO_NEW_SEO_SITE_SETTINGS: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.DO_SEO_SITE_SETTINGS: {

            return Object.assign({}, state, {});
        }
        case actions.ActionTypes.DO_NEW_SEO_SITE_SETTINGS_SUCCESS: {
            return Object.assign({}, initialState, {
                newSeo: payload,

            });
        }
        case actions.ActionTypes.DO_SEO_SITE_SETTINGS_SUCCESS: {
            const generalsetting = payload.data.map(_setting => {
                const tempListModel = new SitesettingsResponsemodel(_setting);
                return tempListModel;
            });
            return Object.assign({}, initialState, {

                getSeo: generalsetting
            });
        }
        case actions.ActionTypes.DO_NEW_SEO_SITE_SETTINGS_FAIL: {
            return Object.assign({}, initialState, {
                newSeo: payload,

            });
        }
        case actions.ActionTypes.DO_SEO_SITE_SETTINGS_FAIL: {
            return Object.assign({}, initialState, {
                getSeo: payload

            });
        }
        default: {
            return state;
        }
    }
}


export const getnewseo = (state: SeosettingState) => state.newSeo;
export const getseo = (state: SeosettingState) => state.getSeo;
