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
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs/index';

import {CustomerSandbox} from '../../../../../../../core/admin/Customers/customers/customer.sandbox';

@Component({
    selector: 'app-customer-address',
    templateUrl: 'address.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./address.component.scss'],
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


export class CustomerAddressComponent implements OnInit {

    private subscriptions: Array<Subscription> = [];
    public closeResult: string;

    // Form Variable
    public addaddressform: FormGroup;
    public address1: FormControl;
    public address2: FormControl;
    public city: FormControl;
    public state: FormControl;
    public pincode: FormControl;
    public addresstype: FormControl;
// Variable
    public pageSize = 5;
    private offset: number;
    private pagination = 1;
    public customerId: number;
    public addressId: number;
    public popoverContent: any;
    public currentPage: number;
    public index: number;
    public submitted = false;

    constructor(
        private modalService: NgbModal,
        private modalService2: NgbModal,
        private router: Router,
        public fb: FormBuilder,
        public sandbox: CustomerSandbox,
        public modal: NgbActiveModal) {
    }

// style purpose
    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

// style purpose
    open2(content) {
        this.modalService.open(content, {windowClass: 'image-manager'}).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    // style purpose
    open(content) {
        this.modalService2.open(content, {windowClass: 'dark-modal,image-manager'});
    }

// style purpose
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

// intially getAddAddressList,regSubscribeEvents
    ngOnInit() {
        this.submitted = false;
        this.getAddAddressList(this.offset, this.pageSize);
        this.initForm();
        this.addaddressform.patchValue({addresstype: '1', tc: true});
        this.regSubscribeEvents();
    }

// close popup
    close() {
        this.modal.close();

    }

    /**
     * Handles form 'onSubmit' event . Calls sandbox addAddressAdd(for add Address)function and updateAddressAdd(for update Address)
     * @param addaddressform entire form value
     * @param params storing entire form value
     */
    onSubmit() {
        this.submitted = true;
        if (this.addaddressform.invalid) {
            return;
        }
        const params: any = {};
        params.address1 = this.addaddressform.value.address1;
        params.address2 = this.addaddressform.value.address2;
        params.city = this.addaddressform.value.city;
        params.state = this.addaddressform.value.state;
        params.pincode = this.addaddressform.value.pincode;
        params.addresstype = this.addaddressform.value.addresstype;
        params.customerId = this.customerId;
        if (this.addressId) {
            params.addressId = this.addressId;
            this.sandbox.updateAddressAdd(params);
            this.addaddressform.reset();
            this.submitted = false;
            this.getAddAddressList(this.offset, this.pageSize);
        } else {
            this.sandbox.addAddressAdd(params);
            this.addaddressform.reset();
            this.submitted = false;
            this.getAddAddressList(this.offset, this.pageSize);
        }


    }

// inital addaddressform Form created with validation
    initForm() {
        this.addaddressform = this.fb.group({
            address1: [null, [Validators.required]],
            address2: [null],
            city: [null, [Validators.required]],
            state: [null, [Validators.required]],
            pincode: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(6)]],
            addresstype: [null, [Validators.required]],
        });
    }

    /**
     * Handles form 'getAddAddressList' event . Calls sandbox addAddresslist function and addAddresspagination function if Valid
     * @param offset initial offset value
     * @param pagesize inital pagesize value
     */
    getAddAddressList(offset: number = 0, pagesize) {
        const params: any = {};
        params.limit = pagesize;
        params.offset = offset;
        params.customerId = this.customerId;
        this.sandbox.addAddressList(params);
        if (this.pagination) {
            params.count = 'true';
            this.sandbox.addAddresspagination(params);
        }
    }

    /**
     * A Function 'onPageChange' using for page change.  Calls getAddAddressList() function
     * @param event form event
     * @param pageSize set event pagesize value
     */
    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        const offset = event.pageSize * event.pageIndex;
        this.getAddAddressList(offset, this.pageSize);
    }

    /**
     * A Function 'editaddadress' using for edit and updating Form
     * @param data get data from addressList
     */
    editaddadress(data) {
        this.addaddressform.controls['address1'].setValue(data.address1);
        this.addaddressform.controls['address2'].setValue(data.address2);
        this.addaddressform.controls['city'].setValue(data.city);
        this.addaddressform.controls['state'].setValue(data.state);
        this.addaddressform.controls['pincode'].setValue(data.postcode);
        this.addressId = data.addressId;
        if (data.addressType === 1) {
            this.addaddressform.patchValue({addresstype: '1', tc: true});
        } else if (data.addressType === 0) {
            this.addaddressform.patchValue({addresstype: '0', tc: true});
        }
    }

// A property 'f' using in validation control in template
    get f() {
        return this.addaddressform.controls;
    }

// A fuction call empty form
    updateForm() {
        this.addaddressform = this.fb.group({
            address1: [null],
            address2: [null],
            city: [null],
            state: [null],
            pincode: [null],
            addresstype: [null],
        });
    }


    /**
     * A Function 'deleteaddadress' using for delete address
     * @param addressId get addressid
     */
    deleteaddadress(addressId, deletePop) {
        event.stopPropagation();
        this.popoverContent = deletePop;
        this.sandbox.deleteAddressAdd({addressId: addressId});
    }

// A function 'regSubscribeEvents'  call after getting delete response for pagination purpose
    regSubscribeEvents() {
        this.sandbox.getaddaddressDelete$.subscribe(_delete => {
            if (_delete && _delete.status === 1) {
                this.getAddAddressList(this.offset, this.pageSize);
            }
        });


    }
}
