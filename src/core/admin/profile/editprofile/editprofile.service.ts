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
import {Observable, Subject} from 'rxjs';
import {EditprofileForm} from './models/editprofile.model';
import {Api} from '../../providers/api/api';


@Injectable()
export class EditprofileService extends Api {
    public subject = new Subject<any>();

    private url = this.getBaseUrl();

    // change psw
    public editProfile(param: EditprofileForm): Observable<any> {
        return this.http.post(this.url + '/auth/edit-profile', param);
    }

    setemit(val) {
        this.subject.next(val);
    }



}
