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
import * as fromGenralsetting from './generalsetting.reducer';


export const getGeneralSettingState = (state: AppState) => state.generalsetting;
export const getNewGeneralSettings = createSelector(getGeneralSettingState, fromGenralsetting.getNewGeneralsettings);
export const getGeneralSettings = createSelector(getGeneralSettingState, fromGenralsetting.getGeneralsettings);

