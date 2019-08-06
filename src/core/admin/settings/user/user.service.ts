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
import {HttpParams} from '@angular/common/http';
import {UserForm} from './user-model/user.model';
import {UserlistForm} from './user-model/userlist.model';
import {Api} from '../../providers/api/api';


@Injectable()
export class UserService extends Api {
    public userdata: any;

    public params: any = {};
    private url = this.getBaseUrl();

    // SET & GET SERVICE
    getdata() {
        return this.userdata;
    }

    setdata(data) {
        this.userdata = data;
    }

    // new user
    addUser(param: UserForm): Observable<any> {
        return this.http.post(this.url + '/auth/create-user', param);

    }

    public updateUser(param: UserForm, Id: number): Observable<any> {
        return this.http.put(this.url + '/auth/update-user/' + Id, param);
    }

    // user group list
    userGrouplist(params: any): Observable<any> {

        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/role/rolelist', {params: reqOpts});

    }

    // user list
    userlist(params: any): Observable<any> {

        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/auth/userlist', {params: reqOpts});

    }

    public userpagiantion(param: any): Observable<any> {

        let reqOpts: any = {};
        reqOpts = param;
        return this.http.get(this.url + '/auth/userlist', {params: reqOpts});

    }

}
