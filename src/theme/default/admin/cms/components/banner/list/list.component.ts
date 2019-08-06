/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
// Store Module
import {BannerService} from '../../../../../../../core/admin/cms/banners/banner.service';
import {BannerSandbox} from '../../../../../../../core/admin/cms/banners/banner.sandbox';
import {ConfigService} from '../../../../../../../core/admin/service/config.service';

@Component({
    selector: 'app-spurt-cms-banner-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
            `
            .dark-modal .modal-content {
                background-color: #009efb;
                color: white;
            }

            .dark-modal .close {
                color: white;
            }

            .light-blue-backdrop {
                background-color: #5cb3fd;
            }

            .image-manager .modal-dialog {
                max-width: 70%;
            }
        `
    ]
})
export class BannerListComponent implements OnInit {

    //  variables
    public closeResult: string;
    public page: any;
    public pageSize = '10';
    private keyword: any = '';
    private offset: number;
    private currentPage: number;
    public index: number;
    public popoverContent: string;
    public pagenationCount: boolean;
    public imageUrl: string;


    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

    constructor(public sandbox: BannerSandbox, private service: BannerService,
                private router: Router, private  configService: ConfigService) {
    }

    // initially calls regSubscriptionEvents,bannerList
    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.imageUrl = this.configService.getImageUrl();
        this.pagenationCount = true;
        this.regSubscriptionEvents();
        this.index = 0;
        this.bannerList(this.offset, this.keyword);

    }

    // this function navigate  to  create page banner
    AddBanner() {
        this.service.setBannerListData('');
        this.router.navigate(['/cms/banners/add']);
    }


    /**
     * Handles form 'submit' event. Calls sandbox getBannerList . function if form is valid.
     *
     * @param event form event
     * @param form entire form value
     */


    bannerList(offset: number = 0, keyword) {
        const params: any = {};
        params.offset = offset;
        params.limit = this.pageSize;
        params.keyword = this.keyword;
        this.sandbox.getBannerList(params);
        if (this.pagenationCount) {
            params.count = 'true';
            this.sandbox.getBannerPagination(params);
        }
    }

    // mat pagination function
    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        const offset = event.pageSize * event.pageIndex;
        this.bannerList(offset, this.pageSize);
    }

    //  edit
    editBanner(bannerData) {
        this.service.setBannerListData(bannerData);
        this.router.navigate(['/cms/banners/edit', bannerData.bannerId]);

    }

    //  function deleteBanner to delete particular id in banner list
    deleteBanner(bannerId, deletePop) {
        this.popoverContent = deletePop;
        event.stopPropagation();
        this.sandbox.deletebanner({bannerId: bannerId});
    }

    // popup  regSubscriptionEvents
    regSubscriptionEvents() {
        this.sandbox.getdeletebanner$.subscribe(_delete => {
            if (_delete && _delete.status && _delete.status === 1) {
                this.bannerList(this.offset, this.keyword);
            }
        });
    }
}
