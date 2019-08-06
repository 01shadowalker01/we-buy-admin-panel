/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2019 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-spurt-root',
    templateUrl: './default.component.html'
})

export class DefaultComponent implements OnInit {

    title = 'Spurt Commerce';
    public mylanguage: string;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {

    }


}
