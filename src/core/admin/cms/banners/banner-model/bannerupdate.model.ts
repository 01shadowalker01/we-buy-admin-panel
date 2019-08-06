/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BannerupdateModel {
    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;
    public bannerId: number;

    constructor(bannerupdate: any) {
        this.title = bannerupdate.title || '';
        this.content = bannerupdate.content || '';
        this.image = bannerupdate.image || '';
        this.link = bannerupdate.link || '';
        this.position = bannerupdate.position || '';
        if (bannerupdate.bannerId) {
            this.bannerId = bannerupdate.bannerId || '';
        }
    }
}
