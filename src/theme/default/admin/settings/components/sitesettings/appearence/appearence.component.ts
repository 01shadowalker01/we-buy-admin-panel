/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-settings-sitesettings-appearence',
    templateUrl: './appearence.component.html'
})

export class AppearenceComponent {

    constructor(private router: Router) {
    }

    appearenceCancel() {
        this.router.navigate(['/dashboard']);
    }
}
