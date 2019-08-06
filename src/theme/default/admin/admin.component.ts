/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HTTPStatus} from '../../../core/admin/providers/CommonInterceptor';
import {PLATFORM_ID, Inject} from '@angular/core';

import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
    public loader = false;
    public title = 'Spurt Commerce';
    public mylanguage: string;

    constructor(public translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object,
                private httpStatus: HTTPStatus) {
        this.getHttpResponse();

    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.mylanguage = localStorage.getItem('defaultlanguage');

        }

        if (!this.mylanguage) {
            this.translate.setDefaultLang('en');
            this.translate.use('en');
        } else {
            if (this.mylanguage === 'en') {
                this.translate.use('en');
            } else {
                this.translate.use('hi');

            }
        }
    }


    getHttpResponse() {
        this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
            this.loader = status;
        });
    }
}
