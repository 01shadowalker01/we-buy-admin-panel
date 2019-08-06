/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, ViewEncapsulation, Input, OnInit} from '@angular/core';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {CurrencySandbox} from '../../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import {CurrencyService} from '../../../../../../../../core/admin/settings/localizations/currency/currency.service';

@Component({
    selector: 'app-spurt-currencyadd',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class CurrencyAddComponent implements OnInit {

    // FORM GROUP VARIABLE
    public currencyForm: FormGroup;
    public title: FormControl;
    public code: FormControl;
    public symbolLeft: FormControl;
    public symbolRight: FormControl;
    public value: FormControl;
    public status: FormControl;
    // VARIABLE
    private params: any = {};
    private editedvalueCurrency: any = {};
    public currencyId: number;
    private EditCurrencyId: string;
    public submitted = false;

    constructor(private fb: FormBuilder,
                private sandbox: CurrencySandbox,
                private route: ActivatedRoute,
                private currencyService: CurrencyService,
                private router: Router) {
    }

    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

    // initially calls loadForm,editCurrencyForm
    ngOnInit() {
        this.loadForm();
        this.EditCurrencyId = this.route.snapshot.paramMap.get('id');
        this.editCurrencyForm();
    }

    // reactive form
    loadForm() {
        this.title = new FormControl('', Validators.required);
        this.code = new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)]));
        this.symbolLeft = new FormControl('');
        this.symbolRight = new FormControl('');
        this.value = new FormControl('', Validators.compose([Validators.required]));
        this.status = new FormControl('', Validators.required);

        this.currencyForm = this.fb.group({
            title: this.title,
            code: this.code,
            symbolLeft: this.symbolLeft,
            symbolRight: this.symbolRight,
            value: this.value,
            status: this.status
        });
    }

    /**
     * Handles form 'submit' event. Calls sandbox updateCurrency  and addcurrency function if form is valid.
     *
     * @param currencyForm entire form value
     * @param params storing entire value
     */
    onSubmit() {
        this.submitted = true;
        if (!this.currencyForm.valid) {
            this.validateAllFormFields(this.currencyForm);
            return;
        } else {
            this.params.title = this.currencyForm.value.title;
            this.params.code = this.currencyForm.value.code;
            this.params.symbolLeft = this.currencyForm.value.symbolLeft;
            this.params.symbolRight = this.currencyForm.value.symbolRight;
            this.params.value = this.currencyForm.value.value;
            this.params.status = this.currencyForm.value.status;
            if (this.editedvalueCurrency) {
                this.params.currencyId = this.editedvalueCurrency.currencyId;
                this.sandbox.updateCurrency(this.params);

            } else {
                this.sandbox.addcurrency(this.params);

            }
            this.router.navigate(['/settings/currency']);

        }
    }

    // validation for reactive form
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    // Assign editedvalueCurrency values  in reactive form
    editCurrencyForm() {
        this.editedvalueCurrency = this.currencyService.getEditedValue();
        if (this.editedvalueCurrency) {
            this.currencyId = this.editedvalueCurrency.currencyId;
            this.title.setValue(this.editedvalueCurrency.title);
            this.code.setValue(this.editedvalueCurrency.code);
            this.symbolLeft.setValue(this.editedvalueCurrency.symbolLeft);
            this.symbolRight.setValue(this.editedvalueCurrency.symbolRight);
            this.value.setValue(this.editedvalueCurrency.value);
            this.status.setValue(this.editedvalueCurrency.isActive);
        }
    }

    // navigate to currency component
    cancel() {
        this.currencyService.setEditedValue('');
        this.router.navigate(['/settings/currency']);
    }

}
