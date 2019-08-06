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
import {PageslistModel} from './pages-model/pageslist.model';
import {PagesaddModel} from './pages-model/pagesadd.model';
import {PagesupdateModel} from './pages-model/pagesupdate.model';
import {Api} from '../../providers/api/api';

@Injectable()
export class PagesApiclientService extends Api {

    params: any = {};
    private url: string = this.getBaseUrl();
    private pagesData: any;

    pagesGetData() {
        return this.pagesData;
    }

    pagesSetData(data) {
        this.pagesData = data;
    }

    // Pages List
    public getpageslist(params: PageslistModel): Observable<any> {

        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/page/pagelist', {params: reqOpts});

    }


    //  Add Pages
    Addpages(param: PagesaddModel) {
        return this.http.post(this.url + '/page/add-page', param);

    }

// update
    public updatepages(param: PagesupdateModel, Id: number): Observable<any> {
        return this.http.put(this.url + '/page/update-page/' + Id, param);
    }

// delete
    public deletepageslist(param: any, Id: number): Observable<any> {
        return this.http.delete(this.url + '/page/delete-page/' + Id, param);
    }


}
