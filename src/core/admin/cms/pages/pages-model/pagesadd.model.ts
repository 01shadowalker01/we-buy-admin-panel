/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class PagesaddModel {
    public title: string;
    public content: string;
    public metaTagTitle: string;
    public metaTagContent: string;
    public metaTagKeyword: string;
    public active: number;
    public pageId: number;

    constructor(PagesAddForm: any) {
        this.title = PagesAddForm.title || '';
        this.content = PagesAddForm.content || '';
        this.metaTagTitle = PagesAddForm.metaTagTitle || '';
        this.metaTagContent = PagesAddForm.metaTagContent || '';
        this.metaTagKeyword = PagesAddForm.metaTagKeyword || '';
        this.active = PagesAddForm.active || 0;
        if (PagesAddForm.bannerId) {
            this.pageId = PagesAddForm.bannerId || 0;
        }

    }
}
