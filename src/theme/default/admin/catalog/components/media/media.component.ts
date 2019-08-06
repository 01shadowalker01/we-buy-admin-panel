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
import * as cloneDeep from 'lodash/cloneDeep';
import {MediaSandbox} from '../../../../../../core/admin/catalog/media/media.sandbox';


@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {


    // uploadedDocument
    private storingFolderpathData: any = {};

    // storing path
    private nextfoldername: any;
    private PreviousSource: any;
    private folderPathData: any = [];
    private pathOfFolder: any;

    // Back event
    private previousIsclicked: boolean;
    private storingFolderNameData: any;
    private length: any;
    // bucketlist event
    public homeTouched: boolean;
    private folderResponseData: any = [];
    private bucketListresponseData: any;
    private CommonPrefixesDatas: any;
    private imageResponseData: any = [];
    private folderResponse: any = [];
    private Prefix: any;
    private next: boolean;
    // refresh page
    private refresh: boolean;

    // delete event

    private imageDataToDelete: any;
    private trashtrigers: boolean;
    private folderDataToDelete: any;
    private filetodelete: any;
    private image: any = [];
    private namelists: any = [];
    private folderRefresh: boolean;
    // creating folder
    public textvalue: any;

    // clickfolder event
    private foldergotclicked: boolean;

    // upload image
    private postImageUrl: any;
    private captureDataUrl: any;
    private uploaded: boolean;
    private editProductparam: any = [];
    private selecetdFile: any;
    private storingImagesforProduct: any = [];
    public documentFiltered: any = [];
    private arrayOfImages: any = [];
    // to avoid more than one subscribtions
    private onetime: boolean;
    // BUCKET LIST
    private firstclick: boolean;

    // Create a folder
    private objectnameFilter: any = {};

    // Reading file to upload
    public nameFiltered: any = [{}];
    private objectFolderFilter: any = {};
    // Uploading image or file
    public folderFilters: any = [];

    // clicking  folder  to open next content
    private selectedFolderPath: any = [];
    // delete a file
    private trashclickedback: boolean;
    private nameclear: any;


    constructor(public sandbox: MediaSandbox) {
    }

    ngOnInit() {
        // initially assigned foldergotclicked as false
        this.foldergotclicked = false;
        this.previousIsclicked = false;
        this.next = false;

    }

    /**
     * Handles form 'Folder' event. Calls sandbox getbuckcreatefolder function.
     *Filter the (/) from the folder name.
     * @param folderName  form create folder text box.
     */

    Folder() {
        const param: any = {};
        if (this.pathOfFolder !== undefined) {
            param.folderName = this.pathOfFolder;
            param.folderName = param.folderName + this.textvalue + '/';
        } else {
            param.folderName = this.textvalue + '/';
        }
        this.sandbox.getbuckcreatefolder(param);
        this.sandbox.getMediaCreatefold$.subscribe(folder => {
            if (folder) {
                this.refreshPage(this.pathOfFolder);
                this.textvalue = '';
            }

        });
    }

    // storing uploaded file in variable .And calls the convertBase64 function
    docufile(event) {
        this.selecetdFile = event.target;
        this.convertBase64(this.selecetdFile);
    }

    // converting uploaded file into base 64 format.And calls uploadedDocument function
    convertBase64(inputValue: any): void {
        const file: File = inputValue.files[0];
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.postImageUrl = myReader.result;
            this.captureDataUrl = myReader.result;
            this.uploadedDocument();
        };
        myReader.readAsDataURL(file);
    }

    /**
     * Handles form 'uploadedDocument' event. Calls sandbox getbuckupload function.
     * @param postImageUrl   form convertBase64 function.
     * @param storingFolderpathData   form pathOfFolder.
     */

    uploadedDocument() {
        this.onetime = true;
        this.storingFolderpathData = this.pathOfFolder;
        const pathOfFolder: any = {};
        pathOfFolder.image = this.postImageUrl;
        pathOfFolder.path = this.storingFolderpathData;
        this.sandbox.getbuckupload(pathOfFolder);
        this.sandbox.getMediaUpload$.subscribe(folder => {
            // this.apiService.document(this.selecetdFile, this.storingFolderpathData).subscribe(folder => {
            if (folder) {
                if (folder.data) {
                    this.filetodelete = folder.data.fileName;
                }
                if (this.refresh === true) {
                    this.refreshPage(this.pathOfFolder);
                    this.uploaded = true;
                }
            }
        });

    }

    /**
     * Handles form 'deleteFolders' event. Calls sandbox deleteFolderApi function.
     * and subscribe sandbox getBucketDeleteFolder$ ,if it get success response then it
     * will calls refreshPage function.
     */

    deleteFolders(fol) {
        this.folderRefresh = true;
        this.sandbox.deleteFolderApi(fol);
        this.sandbox.getBucketDeleteFolder$.subscribe(folder => {
            if (folder) {
                let dataFolderPath: any;
                dataFolderPath = cloneDeep(this.folderPathData);
                this.refreshPage(this.pathOfFolder);
                this.folderRefresh = false;
            }
        });
    }

    /**
     * Handles form 'deleteImages' event. Calls sandbox deleteFile function.
     * and subscribe sandbox getBucketDeleteFile$ ,if it get success response then it
     * will calls refreshPage function.
     */

    deleteImages(dataimages) {
        this.sandbox.deleteFile(dataimages);
        this.sandbox.getBucketDeleteFile$.subscribe(folder => {
            if (folder) {
                this.refreshPage(this.pathOfFolder);
            }
        });
    }

    // home button call bucketListFunction according to the folder path
    home() {
        this.firstclick = true;
        this.bucketListFunction();
    }

    /**
     * Handles form 'bucketListFunction' event.first check condition an store values in (folderPathData)
     *   @param folderName  from nextfoldername.
     * Calls sandbox bucketListApi function.
     * and subscribe sandbox getBucketListData$ ,if it get success response then it
     * will store CommonPrefixesDatas and Contents(folders ,images).
     *
     * And check the conditon wheather it is a images or folders.then stores the data in arrayOfImages if
     * it was image format else stores folder in editProductparam with splitting by (/).
     *
     * finally it calls namefilter ,filteringFoldernames function.
     */


    // Calling bucket list api according to the folder path
    bucketListFunction() {
        this.namelists = [];
        this.nameclear = [];
        this.image = [];
        this.imageResponseData = [];
        this.documentFiltered = [];
        this.arrayOfImages = [];
        this.folderResponse = [];
        this.homeTouched = true;
        this.next = true;
        let datafolderPath: any;
        datafolderPath = cloneDeep(this.folderPathData);
        const param: any = {};
        param.limit = 100;
        if (this.nextfoldername !== undefined) {
            param.folderName = this.nextfoldername;
        }
        if ((this.foldergotclicked === true) || (this.firstclick === true) || (this.folderRefresh === true)) {
            this.folderPathData.push(param);
        } else {
        }
        this.firstclick = false;
        this.foldergotclicked = false;
        this.nextfoldername = '';
        this.sandbox.bucketListApi(param);
        this.sandbox.getBucketListData$.subscribe(reponse => {
            if (reponse) {
                this.bucketListresponseData = reponse.user;
                this.CommonPrefixesDatas = cloneDeep(this.CommonPrefixesDatas);
                this.CommonPrefixesDatas = this.bucketListresponseData.data.CommonPrefixes;
                this.folderResponseData = cloneDeep(this.folderResponse);
                for (let i = 0; i < this.CommonPrefixesDatas.length; i++) {
                    this.folderResponseData.push(this.CommonPrefixesDatas[i].Prefix);
                }
                this.imageResponseData = [];
                for (let c = 0; c < this.bucketListresponseData.data.Contents.length; c++) {
                    this.imageResponseData = cloneDeep(this.imageResponseData);
                    this.imageResponseData.push(this.bucketListresponseData.data.Contents[c].Key);
                }
                this.arrayOfImages = [];
                for (let i = 0; i < this.imageResponseData.length; i++) {
                    let data: any;
                    data = this.imageResponseData [i];
                    const arrayKey = data.split('.');
                    let store: any;
                    store = arrayKey [1];
                    if (store === 'odt') {
                        this.documentFiltered.push(data);
                    }

                    if ((store === 'jpeg') || (store === 'jpg') || (store === 'gif') || ((store === 'png'))) {

                        this.arrayOfImages.push(data);
                    }
                    data = '';
                }

                if (this.onetime === true) {
                    const length = this.arrayOfImages.length - 1;
                    let pathOfFolder: any = {};
                    pathOfFolder.image = this.selectedFolderPath;
                    //   splitting by (/)
                    let splits: any;
                    splits = this.arrayOfImages[length];
                    const arrayKey = splits.split('/');
                    const datas = arrayKey.length - 1;
                    pathOfFolder.path = arrayKey[datas];
                    this.editProductparam.push(pathOfFolder);
                    pathOfFolder = '';
                    this.uploaded = false;
                    this.onetime = false;
                }
                this.refresh = true;
                this.namefilter();
                this.filteringFoldernames();
            }
        });
    }


    /**
     * Handles form 'namefilter' event. splits the storearrayOfImages by (/) and store it
     * in the nameFiltered array .
     *
     */

    namefilter() {
        this.nameFiltered = [];
        this.objectnameFilter = {};
        for (let n = 0; n < this.arrayOfImages.length; n++) {
            let storearrayOfImages: any;
            storearrayOfImages = this.arrayOfImages [n];
            const arrayKey = storearrayOfImages.split('/');
            let data: any;
            data = arrayKey[arrayKey.length - 1];
            this.objectnameFilter.names = data;
            this.objectnameFilter.val = storearrayOfImages;
            this.nameFiltered.push(this.objectnameFilter);
            this.objectnameFilter = {};
            data = '';
            storearrayOfImages = '';
        }

    }

    /**
     * Handles form 'filteringFoldernames' event. splits the storefolderResponseData by (/) and store it
     * in the folderFilters array .
     *
     */
    filteringFoldernames() {
        this.folderFilters = [];
        for (let f = 0; f < this.folderResponseData.length; f++) {
            let storefolderResponseData: any;
            storefolderResponseData = this.folderResponseData [f];
            const arrayKey = storefolderResponseData.split('/');
            let lastValue: any;
            lastValue = arrayKey[arrayKey.length - 2];
            this.objectFolderFilter.last = lastValue;
            this.objectFolderFilter.sum = storefolderResponseData;
            this.folderFilters.push(this.objectFolderFilter);
            this.objectFolderFilter = {};
            storefolderResponseData = '';
            lastValue = '';
        }
        let tempData: any;
        tempData = cloneDeep(this.folderPathData);
    }


    /**
     * Handles form 'clickfolder' event. store pathOfFolder it in the
     * selectedFolderPath array .if (this.selectedFolderPath.length > 2) splice .
     * Then calls bucketListFunction.
     *
     */
    clickfolder(pathOfFolder) {
        this.selectedFolderPath.push(pathOfFolder);
        this.foldergotclicked = true;
        this.next = false;
        this.refresh = false;
        this.nextfoldername = pathOfFolder;
        this.PreviousSource = this.nextfoldername;
        this.pathOfFolder = this.nextfoldername;
        if (this.selectedFolderPath.length > 2) {
            this.selectedFolderPath.splice(this.selectedFolderPath[0], 1);
        }
        this.bucketListFunction();
    }

    /**
     * Handles form 'fileCheckBox' event. store file it in the
     * storingImagesforProduct array .And then split the data by(/) and again store in
     * editProductparam array for addProduct purpose.
     *
     * And split  storeImageData by (.) ,then store it in imageDataToDelete
     * else store in folderDataToDelete
     *
     */
    fileCheckBox(event) {
        this.storingImagesforProduct = [];
        let filechecks: boolean;
        let file: any;
        filechecks = event.target.checked;
        file = event.target.value;
        if (filechecks === true) {
            this.storingImagesforProduct.push(file);
            // SENDING IMAGE AND PATH TO ADD PRODUCT
            const pathOfFolder: any = {};
            let length: any;
            length = this.storingImagesforProduct.length - 1;
            let data: any;
            data = this.storingImagesforProduct[length];
            const arrayKey = data.split('/');
            let value: any;
            value = arrayKey.length - 1;
            pathOfFolder.path = arrayKey[value];
            pathOfFolder.image = this.selectedFolderPath;
            this.editProductparam.push(pathOfFolder);
            //
            for (let s = 0; s < this.storingImagesforProduct.length; s++) {
                let storeImageData: any;
                storeImageData = this.storingImagesforProduct[s];
                const ar = storeImageData.split('.');
                let storing: any;
                storing = ar[1];
                if ((storing === 'jpeg') || (storing === 'jpg') || (storing === 'gif') || (storing === 'png') || (storing === 'odt')) {

                    this.imageDataToDelete = storeImageData;
                } else {
                    this.folderDataToDelete = storeImageData;

                }
            }

        }

    }

    /**
     *trash event to delete images and folders .before checking condition  trashclickedback and
     * trashtrigers will be true.after  trashtrigers it is false.
     */
    trash() {
        this.editProductparam = [];
        this.trashclickedback = true;
        this.arrayOfImages = [];
        this.trashtrigers = true;
        if (this.trashtrigers === true) {
            if ((this.imageDataToDelete !== '') && (this.imageDataToDelete !== undefined)) {
                this.deleteImages(this.imageDataToDelete);
            }
            if ((this.folderDataToDelete !== '') && (this.folderDataToDelete !== undefined)) {
                this.folderPathData.splice(this.folderPathData.length - 1, 1);
                this.deleteFolders(this.folderDataToDelete);
            }
            this.imageDataToDelete = '';
        }
        this.trashtrigers = false;
    }

    /**
     *Handles refreshPage refresh the page with correct path after any delete function has been done.
     * it store nextfoldername data PreviousSource array.
     * then clone deep datafolderpath to avoid overriding.
     * And calls bucketListFunction event.
     *
     */
    refreshPage(pathOfFolder) {
        this.PreviousSource = [];
        this.next = false;
        this.refresh = false;
        this.nextfoldername = pathOfFolder;
        this.PreviousSource.push(this.nextfoldername);
        this.pathOfFolder = this.nextfoldername;
        let datafolderpath: any;
        datafolderpath = cloneDeep(this.folderPathData);
        this.bucketListFunction();
    }

    /**
     *Handles Back event.(Going to  Previous folder function done here)
     * check condition trashclickedback if true  then splice folderPathData.
     * @param storingFolderNameData from folderPathData
     * calls sandbox bucketListApi,then calls sandbox getBucketListData$ if it get success reponse
     * then store value and split (.) to check the image format if the format is correct then store
     * the data in arrayOfImages else ignores.
     *
     * finally calls the namefilter  filteringFoldernames function.
     *
     */

    Back() {
        this.imageResponseData = [];
        this.documentFiltered = [];
        this.arrayOfImages = [];
        this.folderResponse = [];
        this.previousIsclicked = true;
        if (this.trashclickedback === true) {
            this.folderPathData.splice(this.folderPathData.length - 1);
        } else {
            const p = this.folderPathData.length - 1;
            this.folderPathData.splice(p, 1);
        }

        this.length = this.folderPathData.length - 1;
        this.storingFolderNameData = this.folderPathData[this.length];
        this.pathOfFolder = this.storingFolderNameData.folderName;
        this.sandbox.bucketListApi(this.storingFolderNameData);
        this.sandbox.getBucketListData$.subscribe(values => {
            this.CommonPrefixesDatas = values.data.CommonPrefixes;
            this.folderResponseData = cloneDeep(this.folderResponse);
            for (let i = 0; i < this.CommonPrefixesDatas.length; i++) {
                this.folderResponseData.push(this.CommonPrefixesDatas[i].Prefix);
            }
            for (let c = 0; c < values.data.Contents.length; c++) {
                this.imageResponseData.push(values.data.Contents[c].Key);
            }
            for (let i = 0; i < this.imageResponseData.length; i++) {
                let storeimageResponseData: any;
                storeimageResponseData = this.imageResponseData[i];
                const arrayKey = storeimageResponseData.split('.');
                let store: any;
                store = arrayKey[1];
                if (store === 'odt') {
                    this.documentFiltered.push(storeimageResponseData);
                }
                if ((store === 'jpeg') || (store === 'jpg') || (store === 'gif') || ((store === 'png'))) {
                    this.arrayOfImages.push(storeimageResponseData);
                }
                storeimageResponseData = '';
            }
            this.refresh = true;
            this.trashclickedback = false;
            this.namefilter();
            this.filteringFoldernames();
        });

    }

}


