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
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {Api} from '../../../providers/api/api';


@Injectable()
export class LanguagesService extends Api {
    public languagesetdata: any;
    private params: any = {};
    private url: string = this.getBaseUrl();


    Languagegetdata() {
        return this.languagesetdata;
    }

    Languagesetdata(data) {
        this.languagesetdata = data;
    }


// Languages list

    public Languageslist(params: any): Observable<any> {

        return this.http.get(this.url + '/language/languagelist', {params: params});

    }


    // update Language
    public UpdateLanguage(param: any, Id: number): Observable<any> {
        return this.http.put(this.url + '/language/update-language/' + Id, param);
    }


//  # Language ADD
    ADDLanguage(param: any): Observable<any> {
        return this.http.post(this.url + '/language/add-language', param);
    }

//  # delete
    // delete country
    public DeleteLanguage(param: any, Id: number): Observable<any> {
        return this.http.delete(this.url + '/language/delete-language/' + Id, param);
    }

// Languages list pagination

    public Languageslistpagination(params: any): Observable<any> {
        // const reqOpts: any = {};
        // // reqOpts.responseType = 'arraybuffer';
        // if (params) {
        //     reqOpts.params = new HttpParams();
        //     for (let k in params) {
        //         reqOpts.params = reqOpts.params.set(k, params[k]);
        //     }
        // }
        return this.http.get(this.url + '/language/languagelist', {params: params});

    }


}

