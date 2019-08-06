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
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {CustomerSandbox} from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../../../../../core/admin/service/config.service';

@Component({
    selector: 'app-customer-view',
    templateUrl: 'view.component.html',
    styleUrls: ['./view.component.scss']

})
export class CustomerViewComponent implements OnInit {
    public id: string;
    public imageUrl: string;
    public postImageUrl: string;

    constructor(public  sandbox: CustomerSandbox,
                private  configService: ConfigService, private route: ActivatedRoute) {
    }

    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

    ngOnInit() {
        this.postImageUrl = './assets/img/avatar-img1.png';
        this.id = this.route.snapshot.paramMap.get('id');
        this.imageUrl = this.configService.getImageUrl();
        this.getViewCustomer();
    }

    getViewCustomer() {
        const params: any = {};
        params.id = this.id;
        this.sandbox.ViewCustomerDetail(params);

    }
}
