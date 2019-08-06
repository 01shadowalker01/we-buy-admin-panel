/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CountrySandbox} from '../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import {CurrencySandbox} from '../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import {ZoneSandbox} from '../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';
import {LanguagesSandbox} from '../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import {GeneralSettingSandbox} from '../../../../../../../core/admin/settings/generalsetting/generalsetting.sandbox';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService} from '../../../../../../../core/admin/service/config.service';

@Component({
    selector: 'app-spurt-genearlsettingsadd',
    templateUrl: './generalsettings.component.html',
    styleUrls: ['./generalsettings.component.css']
})
export class GeneralSettingComponent implements OnInit {

    // Variable
    @ViewChild('filePath') filePath: ElementRef;
    public postImageUrl: any;
    public defaultImageUrl: any;
    public imageUrl: any;
    // public imageUrl = 'http://api.spurtcommerce.com/api/media/image-resize?width=60&height=60&path=';
    private keyword = '';
    private pageSize = 300;
    private offset = 0;


    // Form Group
    public generalSettings: FormGroup;
    public storeName: FormControl;
    public storeOwner: FormControl;
    public address: FormControl;
    public email: FormControl;
    public phonenumber: FormControl;
    public country: FormControl;
    public zone: FormControl;
    public language: FormControl;
    public currency: FormControl;
    public maintenanceMode: FormControl;
    public submitted: any;

    // Language

    constructor(private changeDetectRef: ChangeDetectorRef,
                private router: Router,
                public fb: FormBuilder,
                public countrysandbox: CountrySandbox,
                public currencysandbox: CurrencySandbox,
                public zonesandbox: ZoneSandbox,
                public languageSandbox: LanguagesSandbox,
                public generalsettingsandbox: GeneralSettingSandbox,
                private  configService: ConfigService,
                public translate: TranslateService) {
    }

    private subscriptions: Array<Subscription> = [];

    // initially calls initForm,dropdownlist,getGeneralSetting
    ngOnInit() {
        this.defaultImageUrl = '';
        this.imageUrl = this.configService.getImageUrl();
        this.postImageUrl = './assets/upload-banner/upload.png';
        this.initForm();
        this.dropdownlist();
        this.getGeneralSetting();

    }

    /**
     * Handles form 'list' event. Calls sandbox GeneralSetting  generalsetting get data function .
     */
    getGeneralSetting() {
        this.generalsettingsandbox.getGeneralSetting();
    }

    dropdownlist() {
        this.countrylist(this.offset, this.keyword);
        this.currencyList(this.offset);
        this.zonesList(this.offset);
        this.languageList(this.offset);
        this.subscribe();
    }

    /**
     * Handles form 'submit' event. Calls sandbox GeneralSetting createGeneralSetting  function if form is valid.
     *
     * @param params storing entire value
     */
    onSubmit() {
        this.submitted = true;
        if (this.generalSettings.invalid) {
            return;
        }
        const params: any = {};
        params.storename = this.generalSettings.value.storeName;
        params.storeowner = this.generalSettings.value.storeOwner;
        params.address = this.generalSettings.value.address;
        params.email = this.generalSettings.value.email;
        params.phonenumber = this.generalSettings.value.phonenumber;
        params.country = this.generalSettings.value.country;
        params.zone = this.generalSettings.value.zone;
        params.language = this.generalSettings.value.language;
        params.currency = this.generalSettings.value.currency;
        if (this.generalSettings.value.maintenanceMode === 'Yes') {
            params.maintenanceMode = 1;
        } else {
            params.maintenanceMode = 0;
        }
        if (this.defaultImageUrl) {
            params.image = this.postImageUrl;
        }
        this.generalsettingsandbox.createGeneralSetting(params);
    }


    // VALIDATION
    get f() {
        return this.generalSettings.controls;
    }

    // Form Group
    initForm() {
        this.generalSettings = this.fb.group({
            storeName: [null],
            storeOwner: [null],
            address: [null],
            email: [null],
            phonenumber: [null],
            country: [null],
            zone: [null],
            language: [null],
            currency: [null],
            maintenanceMode: [null]
        });

    }


    /**
     * Handles form 'list' event. Calls sandbox country countrylist function .
     *
     * @param params storing entire value
     */
    countrylist(offset: number = 0, keyword) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = this.keyword;
        this.countrysandbox.getcountrieslist(params);

    }

    /**
     * Handles form 'list' event. Calls sandbox Currency getCurrencyList function .
     *
     * @param params storing entire value
     */
    currencyList(offset: any = 0) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = '';
        params.count = '';
        this.currencysandbox.getCurrencyList(params);

    }

    /**
     * Handles form 'list' event. Calls sandbox Zone getZoneList function .
     *
     * @param params storing entire value
     */
    zonesList(offset: number = 0) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = this.keyword;
        this.zonesandbox.getZoneList(params);


    }

    /**
     * Handles form 'list' event. Calls sandbox Lanuage languageList function .
     *
     * @param params storing entire value
     */
    languageList(offset: number = 0) {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = offset;
        params.keyword = this.keyword;
        params.status = 1;
        this.languageSandbox.languageList(params);
    }


    // Image Upload

    uploadButtonClick() {
        const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
        el.click();
    }

    /**
     * Handles  'uploadChange' event. calls convertBase64 function
     *
     * @param $event .
     */
    uploadChange($event): void {
        this.convertBase64($event.target);
    }

    /**
     * Handles  'convertBase64' event. finally store the data in postImageUrl
     *
     * @param inputValue .
     */
    convertBase64(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.postImageUrl = myReader.result;
            this.defaultImageUrl = myReader.result;
            this.changeDetectRef.detectChanges();
        };
        myReader.readAsDataURL(file);
    }

    // Subscribe general settings data bind form control values
    subscribe() {
        this.subscriptions.push(this.generalsettingsandbox.getGeneralSettings$.subscribe(data => {
            if (data && data[0]) {
                this.generalSettings.controls['storeName'].setValue(data[0].storeName);
                this.generalSettings.controls['storeOwner'].setValue(data[0].storeOwner);
                this.generalSettings.controls['address'].setValue(data[0].storeAddress);
                this.generalSettings.controls['country'].setValue(data[0].countryId);
                this.generalSettings.controls['zone'].setValue(data[0].zoneId);
                this.generalSettings.controls['email'].setValue(data[0].storeEmail);
                this.generalSettings.controls['phonenumber'].setValue(data[0].storeTelephone);
                this.generalSettings.controls['language'].setValue(data[0].storeLanguageName);
                if (data[0].maintenanceMode === 1) {
                    this.generalSettings.patchValue({maintenanceMode: 'Yes', tc: true});
                } else if (data[0].maintenanceMode === 0) {
                    this.generalSettings.patchValue({maintenanceMode: 'No', tc: true});
                }
                this.generalSettings.controls['currency'].setValue(data[0].storeCurrencyId);
                if (data[0].storeLogoPath && data[0].storeLogo) {
                    this.postImageUrl = this.imageUrl + '?width=160&height=150&path=' + `${data[0].storeLogoPath}` + '&name=' +
                        `${data[0].storeLogo}`;
                    this.changeDetectRef.detectChanges();
                }
            }
        }));
    }

    // Cancle Navigate to Dashboard
    generalsettingcancel() {
        this.router.navigate(['/dashboard']);
    }
}
