/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BannerupdateResponseModel {
    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;
    public bannerId: number;

    constructor(updateResponse: any) {
        this.title = updateResponse.title || '';
        this.content = updateResponse.content || '';
        this.image = updateResponse.image || '';
        this.link = updateResponse.link || '';
        this.position = updateResponse.position || '';
        this.bannerId = updateResponse.bannerId || '';
    }
}
