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
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguagesSandbox} from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import {LanguagesService} from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../../../../../../../core/admin/service/config.service';

@Component({
    selector: 'app-settings-language-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class LanguageAddComponent implements OnInit {
    // Variable
    public updatetitle: number;
    public ImageUrl: any = '';
    @ViewChild('filePath') filePath: ElementRef;
    // FormGroup Variable
    public language: FormGroup;
    public submitted = false;
    public name: FormControl;
    public code: FormControl;
    public sortorder: FormControl;
    public status: FormControl;

    // image
    public postImageUrl: any;
    public imageUrl: string;

    // icon: FormControl;

    private languageinfo: any = [];
    private EditLanguageId: any;

    constructor(public fb: FormBuilder, private changeDetectRef: ChangeDetectorRef,
                private route: ActivatedRoute, public Sandbox: LanguagesSandbox, private router: Router,
                public service: LanguagesService, private  configService: ConfigService) {
    }

    // Validation
    get f() {
        return this.language.controls;
    }

    /**
     * Handles form 'ngOnInit' event. Calls initForm, languageList.
     *
     * get image url from configService.
     */
    ngOnInit() {
        this.imageUrl = this.configService.getImageUrl();
        this.postImageUrl = './assets/upload-banner/upload.png';
        this.initForm();
        this.EditLanguageId = this.route.snapshot.paramMap.get('id');
        this.languageList();
    }

    // FormGroup function
    initForm() {

        this.name = new FormControl('', [Validators.required]);
        this.code = new FormControl('', [Validators.required]);
        this.sortorder = new FormControl('', [Validators.required]);
        this.status = new FormControl('', [Validators.required]);
        this.language = this.fb.group({
            name: this.name, code: this.code,
            sortorder: this.sortorder, status: this.status
        });
    }

    /**
     * Handles form 'submit' event. Calls sandbox Laguage UpdateLanguage and AddLanguage function if form is valid.
     *
     * @param language entire form value
     * @param params storing entire value
     */
    onSubmit() {
        this.submitted = true;
        if (this.language.invalid) {
            this.validateAllFormFields(this.language);

            return;
        }
        const params: any = {};
        params.code = this.language.value.code;
        params.name = this.language.value.name;
        params.status = this.language.value.status;
        params.sortorder = this.language.value.sortorder;
        params.image = this.ImageUrl;
        if (this.languageinfo && this.languageinfo[0]) {
            params.languageId = this.languageinfo[0].languageId;
            this.Sandbox.UpdateLanguage(params);
        } else {
            this.Sandbox.AddLanguage(params);
        }
    }

    // Cancle Navigate to language list page
    cancel() {
        this.service.Languagesetdata('');
        this.router.navigate(['/settings/language']);

    }

    // Edit Language Bind FormControl values
    languageList() {
        this.languageinfo.push(this.service.Languagegetdata());
        if (this.languageinfo[0] !== null) {
            if (this.languageinfo[0] && this.languageinfo[0].name) {
                this.updatetitle = 1;
                this.name = this.languageinfo[0].name;
                this.status = this.languageinfo[0].status;
                this.code = this.languageinfo[0].code;
                this.sortorder = this.languageinfo[0].sortorder;
                this.postImageUrl = this.imageUrl + '?width=160&height=150&path=' + `${this.languageinfo[0].imagePath}` + '&name=' +
                    `${this.languageinfo[0].image}`;
                this.changeDetectRef.detectChanges();
                this.language.controls['name'].setValue(this.languageinfo[0].name);
                this.language.controls['code'].setValue(this.languageinfo[0].code);
                this.language.controls['sortorder'].setValue(this.languageinfo[0].sortOrder);
                this.language.controls['status'].setValue(this.languageinfo[0].isActive);
            }
        }
    }


    // Image Upload

    uploadButtonClick() {
        const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
        el.click();
    }

    uploadChange($event): void {
        this.convertBase64($event.target);
    }

    convertBase64(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.postImageUrl = myReader.result;
            this.ImageUrl = myReader.result;
            this.changeDetectRef.detectChanges();
        };
        myReader.readAsDataURL(file);
    }
    // show all validation at when invalid form
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
}
