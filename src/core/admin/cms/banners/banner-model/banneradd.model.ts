/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BanneraddModel {


    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;

    constructor(bannerForm: any) {

        this.title = bannerForm.title || '';
        this.content = bannerForm.content || '';
        this.image = bannerForm.image || '';
        this.link = bannerForm.link || '';
        this.position = bannerForm.position || '';
    }
}
