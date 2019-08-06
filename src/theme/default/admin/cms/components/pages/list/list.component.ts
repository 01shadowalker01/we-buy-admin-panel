/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
// Store Module
import {PagesSandbox} from '../../../../../../../core/admin/cms/pages/pages.sandbox';
import {PagesApiclientService} from '../../../../../../../core/admin/cms/pages/pages.ApiclientService';
@Component({
    selector: 'app-spurt-cms-page-list',
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
export class PageListComponent implements OnInit {

    // Variable
    public pageSize: any = 5;
    public keyword: any = '';
    public offset: number;
    public closeResult: string;
    public pageId: number;
    public currentPage: number;
    public index: number;
    public popoverContent: any;

    constructor(private modalService: NgbModal,
                public service: PagesApiclientService,
                public appSandbox: PagesSandbox,
                private router: Router) {
    }

    // initially calls getPagesList,getPagesPagination,regSubscriptionEvents
    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.getPagesList(this.offset, this.keyword);
        this.getPagesPagination(this.offset, this.keyword);
        this.regSubscriptionEvents();
        this.index = 0;

    }


    open2(content) {
        this.modalService.open(content, {windowClass: 'view-address'}).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

    // calls getPagesList,getPagesPagination
    regSubscriptionEvents() {
        this.appSandbox.getpagesdelete$.subscribe(_delete => {
            if (_delete && _delete.status && _delete.status === 1) {
                this.getPagesList(this.offset, this.keyword);
                this.getPagesPagination(this.offset, this.keyword);
            }
        });
    }

    //  pages list
    getPagesList(offset: number = 0, keyword) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = this.keyword;
        this.appSandbox.getPagesList(params);
    }

    // pagination
    getPagesPagination(offset: number = 0, keyword) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = this.keyword;
        params.count = true;
        this.appSandbox.getPagePagination(params);
    }

    // mat pagination
    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        const offset = event.pageSize * event.pageIndex;
        this.getPagesList(offset, this.pageSize);
    }

    // # edit
    editpagessList(pagesList) {
        this.service.pagesSetData(pagesList);
        this.router.navigate(['/cms/pages/edit', pagesList.pageId]);
    }

    // navigate- list page to add page
    addpage() {
        this.service.pagesSetData('');
        this.router.navigate(['/cms/pages/add']);
    }

// delete  by using  id
    deletePages(pageId, deletePop) {
        this.popoverContent = deletePop;
        event.stopPropagation();
        this.appSandbox.deletePagesList({pageId: pageId});
        this.getPagesList(this.offset, this.keyword);
        this.getPagesPagination(this.offset, this.keyword);
    }
}
