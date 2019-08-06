/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BannerlistModel {


    public limit: number;
    public offset: number;
    public keyword: string;


    constructor(bannerlistForm: any) {
        this.limit = bannerlistForm.limit || 0;
        this.offset = bannerlistForm.offset || 0;
        this.keyword = bannerlistForm.keyword || '';
    }
}
