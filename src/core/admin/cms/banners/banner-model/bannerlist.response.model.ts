/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BannerlistResponseModel {

    public bannerId: number;
    public position: number;
    public content: string;
    public image: string;
    public imagePath: string;
    public link: string;
    public title: string;


    constructor(bannerlistResponse: any) {
        this.bannerId = bannerlistResponse.bannerId || 0;
        this.position = bannerlistResponse.position || 0;
        this.content = bannerlistResponse.content || '';
        this.image = bannerlistResponse.image || '';
        this.imagePath = bannerlistResponse.imagePath || '';
        this.link = bannerlistResponse.link || '';
        this.title = bannerlistResponse.title || '';


    }

}
