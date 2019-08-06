/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Api} from './admin/providers/api/api';

@Injectable()
export class AppApiClient extends Api {

    params: any = {};
    // url = 'http://api.spurtcommerce.com/api';

    private url: string = this.getBaseUrl();

    // logout
    logoutapi() {
        return this.http.get(this.url + '/auth/logout');
    }
}
