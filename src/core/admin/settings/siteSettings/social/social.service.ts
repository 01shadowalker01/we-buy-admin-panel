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
import {Observable} from 'rxjs';
import {SocialForm} from './social-model/social.model';
import {Api} from '../../../providers/api/api';


@Injectable()
export class SocialService extends Api {
    private url = this.getBaseUrl();


    // new social setting
    createsocial(param: SocialForm): Observable<any> {
        return this.http.post(this.url + '/settings/create-settings', param);

    }

    // get social setting
    getSocial() {
        return this.http.get(this.url + '/settings/get-settings');
    }


}
