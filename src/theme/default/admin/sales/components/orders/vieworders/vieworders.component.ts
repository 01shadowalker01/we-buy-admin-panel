/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {ModalDismissReasons, NgbModal, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {OrdersSandbox} from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import {OrderstatusSandbox} from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {DatePipe} from '@angular/common';
import {ConfigService} from '../../../../../../../core/admin/service/config.service';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-sales-order-vieworders',
    templateUrl: 'vieworders.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
            `
            .dark-modal .modal-content {
                background-color: #009efb;
                color: white;
            }

            .dark-modal .close {
                color: white;
            }

            .light-blue-backdrop {
                background-color: #5cb3fd;
            }

            .image-manager .modal-dialog {
                max-width: 70%;
            }
        `
    ],
    providers: [DatePipe]
})
export class ViewOrdersComponent implements OnInit {
    public orderId: any;
    private closeResult: string;
    private invoiceDetail: any;
    private dynamicBody: any = {};
    private docDefinition: any = {};
    private pdf: any;
    private invoice: any;
    private imageUrl: string;
    public orderStatus: any;
    public orderDetails: any = [];
    public orderStatusId: number;
    public isDisabled: boolean;

    constructor(private modalService: NgbModal,
                private modalService2: NgbModal,
                private route: ActivatedRoute,
                public orderSandbox: OrdersSandbox,
                public orderStatusSandbox: OrderstatusSandbox,
                public datePipe: DatePipe,
                private configService: ConfigService) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;


    }

    beforeChange($event: NgbPanelChangeEvent) {
        if ($event.panelId === 'preventchange-2') {
            $event.preventDefault();
        }

        if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
            $event.preventDefault();
        }
    }

    ngOnInit() {
        this.imageUrl = this.configService.getImageUrl();
        this.isDisabled = false;
        this.getorderstatuslist();
        this.orderId = this.route.snapshot.paramMap.get('orderId');
        this.subscribe();
        this.orderSandbox.getSettings();
    }

    getorderstatuslist() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.keyword = '';
        this.orderStatusSandbox.getorderstatuslist(params);
    }

    open2(content) {
        this.modalService.open(content, {windowClass: 'image-manager'}).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    open(content) {
        this.modalService2.open(content, {windowClass: 'dark-modal,image-manager'});
    }

    subscribe() {
        this.route.params.subscribe(data => {
            if (data) {
                const param: any = {};
                param.orderId = this.orderId;
                this.orderSandbox.viewOrderdetails(param);
                this.orderSandbox.getvieworderData$.subscribe(value => {
                    if (value && value.orderStatusId) {
                        this.orderDetails = value.productList[0].orderOptions;
                        this.orderStatusId = value.orderStatusId;
                        if (this.orderStatusId === 2) {
                            this.isDisabled = true;
                        }
                    }
                });
            }
        });


    }

    onItemChange(data) {
        const params: any = {};
        params.orderId = this.orderId;
        params.orderStatusId = data;
        this.orderSandbox.changeOrderStatus(params);
    }

    /**
     * download invoice for order
     *
     * @param dynamicBody creating dynamic body for the invoic detail
     */
    downloadInvoiceDetail(details, setting) {
        this.invoice = setting;
        this.invoiceDetail = details;
        this.dynamicBody.widths = ['10%', '50%', '20%', '20%'];
        const item1 = this.invoiceDetail.productList.map((item, index) => {
            return [index + 1, item.name, item.quantity, item.total];
        });
        this.dynamicBody.body = [[
            {text: 'S.no', style: 'th'},
            {text: 'Products', style: 'th'},
            {text: 'Qty', style: 'th'},
            {text: 'Total', style: 'th'}
        ]].concat(item1);
        this.generatePdf();
    }

    // generate pdf dynamically
    generatePdf() {
        this.docDefinition = {
            content: [
                {
                    margin: [0, 0, 0, 0],

                    columns: [
                        {
                            margin: [0, 30, 0, 0],
                            width: '80%',
                            stack: [
                                {
                                    width: 180,
                                    height: 60,
                                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkYAAAC+CAYAAADQg8AxAAAABHNCSVQICAgIfAh' +
                                        'kiAAAIABJREFUeJzt3Xl8VNX5+PHPufdmQyGghE0rWpZQN9CKuHSxUq3aKuDSqrVft9ooqVBFY12quLai1pp2gnytSn+' +
                                        't27du' +
                                        'qF+1tVhtv9oCLqDWsipYRRYVkwDJLPc+vz9mMplJZiYzk5nMJHnerxevV+bOXc7czIv75JznnMegusW+xT6ZFu9e2d285w3y' +
                                        'fsB5v' +
                                        'FvoNimllFIqO6bQDei1bmGC02oedVtlPwNQChyIZ/zmOdfImZxFU4FbqJRSSqkMaWCUKR+72p+YP8hOOQmJv38y2mBGCIQIW' +
                                        'jv' +
                                        '4eeg8ritUM5VSSimVOQ2MMuDcwDVeKz8jRGnCHQwwCaLv+vnMtHCWez7P9VQblVJKKZU9DYzS4NzIseI3/88LyPAub9hQYEz' +
                                        '7SxE' +
                                        'wLWa5t1NOpYZ1eWymUkoppbpJA6NUbme002w97rZ4B2d0ow4ABsRvEhcxLdajXoV3Ft8lkMNWKqWUUipHNDBKZC7ltlj3Sc' +
                                        'D7Hi5W' +
                                        'xscPBL5E4rsbpJWdXOGdR313m6mUUkqp3NLAqAPrRi6ilV8Sp' +
                                        'LxbJ6o2MFiSv99iPvIC8l3O49VuXUcppZRSOaOBUYRzA0dK0Dzk+eULObkppcBESNXfJB5YLebvLnIq/8WWXFxWKaWUUtnT' +
                                        'wOhmRtp+80' +
                                        'fPL0eaFB08WRltYEQaJ3Vx2WH91jvHuwhDrluhlFJKqTT138BoLpZlrLtplfNwxc7LNQxwEFCS5v5+mkyAme45PJCX9iil' +
                                        'lFIqpX4ZGNk3cJ74uYsgu+b7WjICzOgM9hewW82aUKuczA95J38tU0oppVRH/SswupmD7RbzqBeQfXr0gx8IVGR2iHiItcM' +
                                        '86zpaXkQppZTqKf0jMPo5Q2y/ecRrkW8aKcBnrgQmZHlskKC1gztC53NlLpuklFJKqc76dmAkGOcG7vBauRgXp6Bt+RIwqB' +
                                        'vH+/nM7OAH7gU8m6smKaWUUipenw2M7Bv4rgRYQIDBhW4LAGWEp+93446LgL3DLA/tkFOYyXu5appSSimlwvpeYHQz+zt' +
                                        '+80e3VSYU3Yf7IlCVg/O4iNlhPeoGvO9TQzAHZ1RKKaUUfSkw+iUVdqN51GuV4wuSR5Q' +
                                        'Om/D0/VwtDhCghR1c6f2Qu3J0RqWUUqpfK84AIkPO9VzttfIzXMoK3ZauyCgwX8jh+QCrxWw0zfLd0EW8krszK6WUUv1' +
                                        'Prw6M7Jv5Ni1moQRkaKHbkpFJkOsQTjywdpr/c1vlu9TwcW7PrpRSSvUPvTMwmssXHc887rbKxN74AWQImPF5OnkI' +
                                        '1zRbC9wPvYuZi5enqyillFJ9Uu+KK+ZSamMekBY5hWLNI0rXvsDAPJ6/1TSZHfJj90f8Po9XUUoppfqUXhNcWNczG' +
                                        'z+/IER5oduSEzmYvt8VEbB2mLVuq3yPGt7I35WUUkqpvqHoAyPnRo6SgHnA88uoom9spvYBhuX/MuIh1nbzF3cXO' +
                                        'Znvsj3/V1RKKaV6p+' +
                                        'KNNW5jmNNsnnJbZUrxNrKbcj19vytBAtZ2fhE6n7kYpIeuqpRSSvUaxRdznIZtfcmaT8A7D6/HQoaCkZFg9urZa' +
                                        '5oW8xmt1jnuD92ne/bKSimlVHErqsDIvoHzpJV6QuxS6Lb0qDxM3++KCJgd1gqvxTuNC1nTs1dXSimlilNxBEY3M' +
                                        'NkOmEe8gOxTHA3qWXmdvt+VEGJ2mMfc7XIWs/AXqBVKKaVUUShsHPJzhth+85jXIt8w/TzjRfYDs2sBG+' +
                                        'CnxW7mqmANvypgK5RSSqmCKkxgJBjreut2/DILV5yCtKHYVAAHUNBQVQSsFvOxaZTTQz/mb4VriVJKKV' +
                                        'UYPf4Ytq/n+xKggSCDevraRW8ssHuhGwHigtVsv+oG3BlcxJZCt0cppZTqKT0XGF3HeMczz7h+Gdcf84jS4' +
                                        'hCevm8VuiERQVyz3VrgfujNZi6hQjdHKaWUyrf8xyi3sYu93TzgtchJptA5Tb2A' +
                                        '7Almj0K3ooNWs900ycXuRSwsdFOUUkqpfMproOJcx/VegJ/iUprP6/QphnCvUUmhGxJPBKzt5j3XL9Op4e1Ct0c' +
                                        'ppZTKh7wERvb1TJMA9xFkt3ycv6+ToWDGFLoVSbiI2W6ec7fLGcyiqdDNUUoppXIpt4HRNYxxLPOk2yr765h' +
                                        'ZNx0ADCh0I1LwE7S2c2toI9cxF6/QzVFKKaVyITfxy1xKLaw/yE7vVM0jypFdgf0K3YjUBLB2mG1st85zZ7' +
                                        'pP9uClrTFjxuxrWdZXRCTked6S9957751Ik5RSSqmsdTuIsa7ncvzcQIjyXDRIxagGBhe6EV0TD8x2621Pv' +
                                        'Omcx3v5us4+++wz3HGcBmPMt6BT2ZgdIvJcMBi8eP369Z' +
                                        'vy1QallFJ9W/aB0Q183Q6YRyQgw3PYHhWrFJhI8Uzf70oIzzRaD7jiXUgNO3N56nHjxp0BNAA7gNs8z3vbtu' +
                                        '23XNe1gP2NMRONMZcAA4Hz16xZ83gur6+UUqp/yDwwupmRtt887rXKYTpm1gNGAyMK3YjMmBbTarbL1aEa7s' +
                                        'R0f3hr3LhxNxpjrhGRx0Xk3LVr1yZM+v7iF79Y6TjOQmA6cMPq1auv6+61lVJK9S/pxzZzcSyx7sHv/Rder+' +
                                        'nD6P1swr1GRTZ9vyuR6f2bzHb5XnfKi4wZM+bLlmUtE5Ffrl279rJ0jhk/fvwdIvITY8xhq1evXpbttZVSSv' +
                                        'U/aQVG1nVcSIBf4lKR7' +
                                        'wapzop6+n4XouVFWt1TqCWj3J+99967vKSk5B1jzM7Vq1cfDOmtvr3ffvuVBgKB5UBpMBjcf/369a3ZtF0ppV' +
                                        'T/k7qA6w1MtgLmUWmRvXTYrHDMJ8BIinv6fhLGBhnsHmEF+NDcY/232+Jdwiz86RxbWlo6nfBg4gHEBEXj' +
                                        'x4/vODz3iud5961du/Y+gH/961+B8ePHnwG8VlpaOg14JDefRimlVF+XeEjsdoY615oXzXaWEtCgqCi8X+' +
                                        'gGdFMptuzmXWQ' +
                                        'PMZ+W+Ozz0zlERA4XkX+sXr16ZaL3Xdf9iuu6XwG2WpZ179ixY7/V9t7q1atXAP8UkcNy8wGUUkr1B/E9R' +
                                        'nOxLM+q5xPvQs8TWwOiIrId2AYMKXRDukcGyC6hCve39kLrGmuHNyNYy/Jk+xpjDheRd5O9v27d' +
                                        'ulcA9tlnn+aSkpLpQMcqc+8BGhgppZRKW7THyL6W06wAjbR6tXjYhWyUSmI99IU1po0BGejt7Vbxhn2veY' +
                                        '5fJi0dsy+wJdW5hg8fvktJScnZkZcfxb4nIpuNMfvnoMlKKaX6CYe57Ou45jG3VSZoD1GRCxAOE3rZ9P2k' +
                                        'bIwMluOscjZZd1u3hzZ51zK3PZdIRNYYY8YnOzw210hErl27du2fOuwyQUTW5KHlSiml+ijLtqw3PL8G' +
                                        'Rb3GR+GZXn1KOSVelXelvaf9Uod33hSRg5IdFgwGJ3qedz6AiHyUYJeDjTFv5LKpSiml+jbLqjBlzlAHU' +
                                        '6qhUa8QAj4odCPyIARmO5922LrcGLPXmDFjjk90yPvvv/9WZCbaK8aYq4YPHx4tEzJu3LhjjDF7eJ' +
                                        '6ngZFSSqm0WW7AwzgGZzcHe4iNZhcVP7MF6GMr89if2liuCcZu8/v9vwc+tixrwdixY8uSHSsifzL' +
                                        'GjBk4cOBXAPbcc88K4H5gUyAQeCivDVdKKdWnWCJCKBge' +
                                        'm7HKLEqqSrAG2Yh2IBU1WV/oFuSOabawWjuvHPHBBx9s8zzvDGPMFyzL+n' +
                                        '' +
                                        'my40XkQQDLsn4GUF5ePg8YJSLf++CDD7blq91KKaX6HgdAgh7iWBgTjobsARZ2uYW73cXd6XWj0qzKF9MI0' +
                                        'gxmYKFb0k1BsLclrzCzdu3al8ePH/8L4Kfjx4/fJxQKnbN69WrTYZ91gNl7770Hjxs37iljzIkictOaN' +
                                        'WuyLkWilFKqf4quY+QGXZzSmGWNLLAH2VgDLNxGFwl2uxaoyjHzPuE1oXtr5CrhITTTRffk6tWrrx' +
                                        'w/fvwKEZlv2/bbY8eO/aVlWW/v3LnzzbKyMgfY37btScDlIlLued60tWvXPtUjn0EppVSfEo2' +
                                        'EJCR4todlx//1bhyDs7uD5/dwmzxwNUAqGi0gn4CpKnRDsmM1WVj+9OoRr169+uG99977pZKSkl' +
                                        '9blnUTsMuAAXE1UnaIyPO' +
                                        'hUKj2/fff35yP9iqllOr74la+9oKdA6M2VpmFNdTC3enhbncxGh8VBfMBsBu9L2k+ANbn6QVFbdavX78' +
                                        'JOA2wxowZs68x5qtAQESWrFu37l+AfiuVUkp1S1xgJJ7ghjxsJ8kDy4C9i4VVYeE1ubitmn9UcCGQjW' +
                                        'C+UOiGZEDA+cTBZP/t8datW/cO8E4OW6WUUkp1LiLrBV1EUv/hbSywB9s4u9mYkq4fbgPLBjJm9zHZt1' +
                                        'KlZD4mvCp2L2E+tzBBDamVUkoVH6fT40nCQ2rBK3K/vLJ9hT4M80JAPgAzttAN6ZppNdhNmQ2hKaWUUj0' +
                                        'l4RPKC+WnUmlFSUVezqvAfArsKHQruuBFZqHpAKxSSqki1aN/uh84c' +
                                        'mJPXq7/KfJFH61tFiakQZFSSqni5SR7w77ZYJfZSWepdcULeLhNLg0n3k3NYTUAHLbXYSz54J/ZtVR1bXtk+' +
                                        'v7QQjekM9NisLf3tqlzSiml+puUUY8X9LpMxE564lKLkqElvLVtRXTblL0Oy+pcKn1mA5D79LAufXXoVxm/6' +
                                        '/jEb7rhITSllFKq2KUMjMQTPLd7+UZvf/5W9OdJoyZ161wqDZHp+z3tjgPu5N/HruK1o9/gwMoD496zP7Mxrg' +
                                        '6hKaWUKn5djpN5gex7jQDe2voWLaEWAMYNHUfFAE3Azreenr4/onwEBw8+GIBJlZPY4t/S3pZmC2unzkJTSin' +
                                        'VOyTNMYrlBT3s0uyGQlrdVt7+5G0OHXEolrE4Yt8jeGndS7hNbkGGfPqFHp6+P23k9GgB4r99+jc2tW4Kv9FF' +
                                        'gdg+rY5qXAZhc3in91z+gU0T81hVgJYppZRKIb3AK' +
                                        'ORhORbGym44ZMWWFRw64lAADh05hb99+DesKgt3h5YXyRfzKTAS2CX/15o2anr050f+83D4hzQLxPYpc5hsWXx' +
                                        'PDGcZGJ60TEtku9Sx2cAzHjwDLGYezT3VVKWUUoml/ee8G8y+e2fpx0uiP0+sap+yb+9iUVJVglVhaZGrfOiB6' +
                                        'fsDnYF8o+obAIgIiz5+EsisQGyvV0e1qeMxy2' +
                                        'YphjkGhqdzWGS/8y14wsAa5jA5zy1VSinVhbR6jADEDSdiZzN9f0lsYDQsfi0jY4FdaWMNsHCbXCSoIVLObAf' +
                                        '5DMxu+bvECSO+TalVCsDSbUvDw2hZFIjtteqoNvByusFQMgaGi01TrpqllFIqO2kHRgBuwMWUm2g+SbrWbFtN' +
                                        'S6iFCqeCsYPHMbRiKJ+0fBK3jykxOLs7eK0ebrMHrgZIuWA2AIPJ21Ke3/vC6dGfF218MhcFYnuPHAVFAAKbNe' +
                                        'eoCFzG0ZbF4thNnsuh3MGyQjVJKdWzMntcCllN3xeEtz95O3xBY3Hw8IOTN6jcomSog7WrTX9KT' +
                                        '8mbAMim/Jx6oDOQ44cfH3395MYn+1WBWAO3dBUUifCywOMd/m1OsOsreWqmyoBlOKHQbVBKFVZGPUYQnr5v2V' +
                                        'bGvUZLP14STcA+sGoif17/5+Q7G7B3tbAqDF6zh9vq8dOjfsp39j2RPQbtwYiBIyhzyqK7+0N+NjVvYlvLNv5n' +
                                        'xSPc+tIvMv1YfZrZCAwji992arHDaKu2r2L1J6uwm/rJQo7h3qKTU+xxrwfXchsJV5WSOqoRTjOGHxsYLvBynlqq' +
                                        '0lXHQIGz+kdYr5RKJqtHpRvwcMoyewAu+XgJPz7oYgCmjJyS1jHGNpz/lR9y5ZSrGD1odNL9ypwyRg8Zzegho/l0' +
                                        '56caGHXkgvwHzD65PW3sbLQnP3qyvxWI/VayN0R4WW7jhymPDg+b3SR13CVwLh7v5LqBKmNTczEsqpTq3bIKjMT1' +
                                        'EC+z6fsrtrSXBjk0zcD' +
                                        'ossmX87PDr6XM7tw7FKtjD5LqzGwBRgA5Wl+zxJTEDaM9vXJRvyoQa+Dryd4Tw/1pnyg8Rb8+F21S3WOEn' +
                                        '/SfuF4plUzWgyuhgEtJefqHxyZgDx8wnOEDhrN5Z6JUi7BjRh/D5ZProkHRlp1b+P27/4+r/3YV7nYXd4cX93' +
                                        '/YFZGhth2BHdl+pD7hiqN+ymGjD+ewvQ5j4WsLufK5K6LvyQYwE3JznaOHTWVQySAAPm75mNfeey03J+4LXN4tdB' +
                                        'NUhuqYnirYVUr1H9lnnXiZTd8XhGWblvG1Pb8GhKftp8ozqpl4IZVllQA0+hs5//lzeWHDC+H8o4Ft0/s9xB9OBr/' +
                                        '1pV/oEBpQc' +
                                        '9iFjB6SeNjRNII0gqns/nVih9GeWft090/Yl4RXu879LKY6ZllwV6K34mZOtS00CYcY0/6wF+EdY1iS7YKSpo7Hku' +
                                        'VVeTCbeSl6vuYw2bJZmuxtb14XfTWpPnvHY+uYbsF3BL7TNjQm8LjM45QO+w3EY7K' +
                                        'xqE2VL2bZLKUuSbt1xppSfU630nEznb6/9OMl0cDo0JFTUgZGB1S1FyJ97v1nw0FRDGMbnCE2XsDgNmp5kXSZDcAB0' +
                                        'N0hg5NGnBT9+em1T3XvZH2MES6QOu7v8ZWswwnht7Q95Dv+io1hf2B/C84X2CyXcSa382KPtjEf6hjIPJqZw2RjcZ+B/' +
                                        'aHrr7gFTflaxiJTCxYsmBAKhU4HTgD2MMaMin1fRJYBHxpjFs2cOfN3WZ77K8CXOpx7lYi8a4z528yZM3+Vabt9Pt+J' +
                                        'xpi4/wBmzpwZd+sbGhrOFpGjgP2MMXGLmEY+178cx7m1pqZmZaK2u657nIh8Ddizw/HNIrLUGPNMpm1vaGiIWw9GRE6q' +
                                        'ra2N/oU3f/78Iz3POw04whgzARgYs/sqEXk' +
                                        'XuD/2mDb19fVVjuOcEPOZ446PfOZnXdf1zZo1a2sm7e4o8ru9MEE7m0VkJfCs4zgPJ7q3yfh8vl8ZY2bHtre2tvbQtt' +
                                        'eR3+c0YErsd0lE7qqtrf1JBu3O5/e9W/eke/OUBNyQh1OSXiL2iq0xeUYj0sszAvho+0dJ37NKrXB5kZ0ebrOWF+lSC' +
                                        '8hWMMOyP8WU3Q5jZMVIAJr8Tfz1g7/mqHG9hwhvGpO4l8EY9kd4Wuo4saeCI8vie8CcdPc3MNxYLOZy7vBu47I8Ni3' +
                                        '/XCZQxx4WPFHopmQq8p/4La7rzkj1B2YkIJgMzPD5fLWxD6pk6uvrq2zbXtDFuauNMdXAjIaGhhuAa7MJkDqKfK4rjD' +
                                        'GnAAOTXb/tc7mue47P51tYW1t7LkBDQ8NPgAtd162O7Jfo8IHGmKnAVJ/Pd6brut/uTqARuV+1wAUiMiqde+bz+Za1' +
                                        'Xdfn850IzI60KWmHQd' +
                                        'tntm37gvnz53/3oosuynipjsj9/Y3rulNT3Ju2e3udz+dLO2hJ0N5BEA2IbgFS3Zt02p2X73su70m3/16SoIdIetHI' +
                                        '0hQrYKdSPaS6y33sARalVSVYA7S8SFfMf+hWD1vsMNqf1j9P0At2v1G9jfBqqreN4etGeLXHynyY9' +
                                        'IOiTsddzjU5bk3PsvhWbwyKGhoafuK67lJjzIwMD/1XVzvMnz//SMdx1mV47oHAnT6f7/EM2xPH5/M97rruv40x5xDf' +
                                        '05KSMeYcn893v8/n+wi4E+j6P/72Yyfbtv1QFs1tMztyv67r2HuRznV9Pt9SY8xTbUFRmseO8jzvf+rr66syaajP5zsx8r' +
                                        '3J5FqzGxoaVmZ6rYhqn893P7A' +
                                        'wk3vTUT6/77m+JzlZ2Sbd6fsbmjaweefmaPJ1qgTsjds3Rqfof3XPr3HM6GM6Dad1YoE9KJJ/1Ni5vIh7a/j1hm0b+O' +
                                        'Iv9gbgvMnnc+7k8xi7+1iG7RruRmlsbWRT8yYW/WtRXPJyIn++4C9MHRv+XS' +
                                        'xeu5hj7/lmTvZP1Nbfn/4A3/7St6ksr8Qf8nP9C3O59aVf8N5P1yfMK6o7qo66o9qTI6LnCoF8BGavlE1NanpMYPTUu' +
                                        'n46j' +
                                        'HY7L8rlvBMZnkrIGPY3Nku5nDs8wy+Zl3hNo0KzDDd6c/hTb82VsQw3FroNmYr0iNyZ5O1VIvIPoDHy+ghihhuMMSuS' +
                                        'HAeEgyIReY7OQUmziCyF6NIQ+xtjDu24nzFmhs/ne7y2tjbVOl1JJXrwRYZG2v6YSHjdyLHnJDh2I7AE+CCy6YiOQ3K' +
                                        'RY6f6fL4TEw1vpdHmRA/U' +
                                        '2N/DXnQYOuri2HTv9Sjbtq8G0urNifxuE/2n2/F6ie5RtW3bC0i9/lpCiX4vmeiB73tO70lOAiNxPTzXpJWIvWLLCo7d+' +
                                        '1ggnGf0dJIH6+/+tZDDRx0OQGVZJfced397AnYXjBMpL+L3cJuSlxf5/ekPcMoBp3Sa6l9ZXklleSV1R9Vx7Phj+fJdB' +
                                        '3V5zXx7ffabTBo1Kfq6zCljcMWQrM9nNgFVZDx9v3rXCVTvGv5DLuAGeP7957JuQ28nHueZFAnFUeHCsmdJHbdAfnOPRH' +
                                        'hHDLfHzYyz2dcIl6UM4izuk3D2Wb/huUS751MmhsM5SWca2qSdu9EmMuTS6SEhIosdx' +
                                        '/lxstyHSN7LnZZlJQ1g6+vrqxIFRSLyhOu6NR2HmtqG2zoGM8aYGQ0NDWdnmt/R4ZobjTG3hUKhB9K9bsc2O45zVbLco1Aot' +
                                        'DhBoHIu0J3ZIM0icp/jOHcnuq7P55trjLkuRZuXATcmyz2ybfuhBIHUaaQRGMX8bjte8y7XdW/ueI8j+VlPEtPzF' +
                                        'gl6swoeI9' +
                                        'faCNxjWdYLbUOAkZyq7xMuPtVJD33fO567W/ckZ2she8H0Zqi9tbU' +
                                        '9MJqSIjBa+M79fLf6exy919EADBswjEenPc4L6//MqU+dkvCYjqwyC2toJP9oe/zY0e9Pf4AzDzoTgFVbV/F' +
                                        'h44fR9w4YcUC0' +
                                        '92jSqEm8PvvNggZHDTPujguKOnpl/Sus/XQtAIfseQiV5eFpZ8s3Lu' +
                                        'fTnZ9G99vcHNM7J9lN358+or236KX/vERzoGfzi4vKHSzz6pidbLZULAPDDdwlcJXUcSHzeDKXTRHYLHAFt5HoQbZM6ngc4' +
                                        'enYWWpx7TPsL5dxdJ9Ixk5XbA9ZkllnQHj5hRz1pkW67e/uuD2dxNXIgyhlrkXkr99OQVGy3p/Ig+Nkn8/3eIIg5df19fXP' +
                                        'ZpO309XnmTVr1tb6+voax3G+maC9yxzH+a9UybE1NTUrGxoargIWxm43xuybaVtjrrvYdd0zUn3e2trauT6f74QESeQbg' +
                                        'QtTBRyRz3yG4zhbOrR5VH19fVVX9znR7xa4pLa2NmFOWE1Nzcr6+vqvOo6zrsNxPyOL4FFEFrquW9exnZHXCdtQiO87Obg' +
                                        'nOZuTIZ7ghrquo7YkJs/owKrUeUYnPHYcL37Q/v90mV3Gd8acyOaZW1l4fJp/yBiwd7EoqSqJbhpcMZhTDjiFLdu3cNVzV' +
                                        '7Lv7RM49p5vRv+NvHE4T73bHrBNGjWJhhmdfrc9Zsb+M/CH/Dz45oMcf+9x2FcYFvxzAZ+3bAPgBw9/P9r2z1s+jx7359' +
                                        'V/jvtcP3j4+3HnbZu+nzaB6cPbA6On1y3q1ufqE+ZR78HsrncMMzDcgidMHY9RR9bj9Qm8wryEQVHYPJrFcGaqE/SJOmHCH' +
                                        'Z7HVA8GefMw3jyMBxNEeLPQTQOwbbs2wQycxdkmxsZasGDBhI7BjYhsTGdIzHXdmsjDPdbASE9ARiKzmLr8PLNmzdo' +
                                        'aGero6NV0ZlEl6c1KOy+po9ra2m+mGQQ+m2DbR+n0wkQ+c6cg27btw1Idl+R3u6yrRPnI9R6L3WaMmbxgwYKM/iQWkYW1t' +
                                        'bXnZhokF+D7npN7' +
                                        'ktPJql7Q7TIROzYB+6BhB3VZQuKEx47jjtdup9Hf/gSvLKvk9AlnZBQgmZhP2tajcvYj/5V07aMZv5vG4rXtRbZn7J9pvlh' +
                                        'ujBg4gmG7DuP6F+byg4e/z59X/wmAmU9cmJN1m8wGSDdbfVRwFJOHhQN4EeHpdbp+EdAWHM1IU' +
                                        'hw2IQMnG3iDOs7OZ9PihHOc7k32thjO6rG25JgI73gwwbuNy7idF+OGK+exitu4qYDNi3VBxw2O4/w4FycOhUKJEiLvSef' +
                                        'YWbNmbTXG3JbgrQu716oudasUTqIgI9OHfhZe7+bxnSZuGGPGpDogMrW94zG+NK/XKZnedd30p4WHZfIndKx8ft/zdk9yu4' +
                                        'pHZPp+Kpt3bo4mXFcNqGLckPFdnvbqv1/F8IYqHl75UMIAadX5azhn/3Mzaurjqx7nz+tSFLIFjr3nm/hDfgCG7TqM8yaf' +
                                        'n9E1cqHMKePVDa/mb/HKFpAtXe9GAKZVTY9OQV22eRmbdmzq4qB+ZB5PCnxdJP1isJHeo4XW5dyez6bF8uCtVO3JcS9Wj' +
                                        '4jkVR0RqT9' +
                                        'XtObPn39kgr+en8hkjZkuHNtxg+M4D6d7cCgUeiDB5uosZzIVTCgUGlfoNmRKRPZO9b4xplMQkG7+V6KeL' +
                                        'BHJe25Ivr/v+bwnOV/eTIIe4qXugoitm5bJtP1znjub4Q1VPLPuafyuP7p99KDR3HV0PZdNvjztcz246g+UDHWwdrWRFJ1W' +
                                        '/97y7+jP44Z2HcTlwzPv5rdnxnxI6un7HjifOJw0Zlp001NrdRitk3mskts4KtPeIwxzeiw4cvlHF+/v0SPt' +
                                        'yCXD6h5fTDMLnucd03GbMeZvuTh3fX19VYJE5OZMHkKRYZJOwWVXwzyqR8QNESbqKSs2+fy+R+TtnuQs+TqWG3Rxyp' +
                                        'KfeummJdEE7IlVE/njqv/J6PynPnUKx4w+hksOmRNNzi6zy/jZ4dfyScsnLHwndQ3PLTu3tJcX2dXCqjBx5UVixSYvf3nPL' +
                                        '2fUzlzJe6mTLqbvW9ssBplBHPWFo6LbntLVrpObx5NSx2KBcw1clVbFdsMc6ng7ZZ6Q6u0O7LjBGJOT/8wTBS+RVX4zElkFu' +
                                        '2Oezpfp3kwv1Q2RWV0d7eHz+bq9EGee5e37nu97kpfASNzUddRi84wOHZnpUGfYCxte4IUNL3DZ5Mv52eHXUmaXUWaXce' +
                                        'WUq7oMjFozX++HAAAgAElEQVRCLXGv48qLNLkQyqpJebFlezrjXN1nNhF+fJd12N5isLfbHFd9PKV' +
                                        '2KQCrt61i9baiHrUovHAPR' +
                                        'r3Ucb/AuWnOXLtV6ni8N/R+qKzs2XFDNqse59kHCbYlnIatCifSO5j2pI8C6dHvey7vSd4qBXnB5LlGsUNpk0dM7jIBO5Xbl' +
                                        '93Gb978dfT16EGjMxpSi2WVWp' +
                                        'QMLcGqtPN4ZzLTEmzpeqdcEJD/dNjmgv1peOHOk8a010bT3qIMzKM5kpy9hyRI+IsV6VnKalE9pZRSuZG3x3+q6fubd25mQ9' +
                                        'MGACqcirQSsFO5+u9XsWVne8/K/kOTrmOXFrsiPL3fGmBRUdK+AuLrH3Z3MkJxM58C29tfW9tsjGsosUr41t7HRbf/T4ZD' +
                                        'nwqYx0aZxykId6TazcBJqd5XSqnuMsasL3Qbik3sPcnLUFobL+hi2SZhMb2lHy+JlvyYOGxit4dmYofHhg1IndIxYpcRXZ' +
                                        '/QhMuLjK0aG9205pPVWbev19gA7Admh8HeEY6bj9vneAaVDQLCw2hvbU25QrtKwbuNy0wd+5jkPUNH5rUBNqkXwLNJXrF' +
                                        'ZKVUUMqlk3' +
                                        '1/k8p7kd8BIkg+prYh5uE7JMs8oVoXT3rPz5pY3Uu5bZpelNdx281dvYdiASP00fyP3vdF5CZjYXqSxu4/t9H5HB4zIb9WF1' +
                                        'lBr906wHdgE9iftte' +
                                        '++W/3d6M86jNZ9QvIp/WklaneDJcnLfghsLtZ6bn3V/PnzcxIIW5b1WcdtxmS6rr3qRbKsdFlYufq+J5Gze5L3TBovlH' +
                                        'j6fmyvQ6IE7LfOeZtjRnea7ZdQbAAD8NIHf+3ymAsO/FGX+5w6/rToz69vfj08vDYwfnp/bC/S6CGjU6511DDj7mipk' +
                                        'XyJLW2yZ2Wn3Lf0bAB3W3j+fsdhNJ2mnwNe9xa16w6BbyV7z8AzPdmWfqjTwn4i0qkYajaSJLUOzGKxwyM6bjDGFMWq4f' +
                                        '1VkhW1s/zPvUfl7fue73vSIynGbrDzIjlvbH4DT8K9SQcMPaBTAvb4IdU8Ou1xlpy1NGXvzsLjf8ePD7o4+vofG/+RVqH' +
                                        'Z0YNGs+SspQmDr2NGH8OSs5ZGh/oa/Y3c+Vo4NaStvIhVYSHAfcvujZs5dvNxt3Ds+M7Pnp8ffyvnHNKtAsUZ687yAuIXP' +
                                        'L/HN/b6RnQY7ePtH7N0U9c1U/uNus7VwdNiJS/mKpLHoK' +
                                        'mO6akKyXoaGOVVogBDRL6Ww0t0ykdwXfe4RDsmk6iXybbtJYn2VT0q7ndrjJlc7Atv9vT3PZf3JK85Rm0STd//pOUT1n6+' +
                                        'hvFDqqlwKjig6sBOuStldhkTqyYxsWoSN33l5mjCdpsRu4ygzG6fX75l5xZu+WfXK/+3nWdi1SQenfY4Kz/7N5+2hHuid6/' +
                                        'YjQm7fSl6Xr/r57Zl8+KCLWOBXWljDbBwm1wWvraQuqPCVSiH7TqMJ89exOsfvR6dUbZn5Z5UV1XjD/lZvnF5yoKw3bV4z' +
                                        'V+YOjZcvLm6qpr3fro+WmC2oqSCrzak35PpNrmcGDMb7Zn39LkZR5ht6jhIPHxpF1+tY6ARLkg2EdMYlqRZoSUz4evemOy' +
                                        '6kWG0lIVtBV5OlhtlhJMF6rvf0CJkczh0v4hsKBR61nHi/8s1xsxYsGDBhFysBiwi/+i4BpGInEmSAp8dRdaG6Rjsr8rhy' +
                                        'twqS4l+t5E6dkW7llEhvu+5uic9NindDXSuoxY7' +
                                        'bX/KyPgiuh2DIAj38sT+iw2K/rHxH5z//Llp9RYB/PgvM9myc0s0+Dp6r6M5eq+jmVg1KXreRn8jN/7jBm5flqiEEJgSg7' +
                                        'O7wzX' +
                                        '/vIoHVzwY3V7mlHHE6COYOnYqU8dOjQZF178wN27ByHy49aVfsHzj8ujr0UNGR9uxx6AMFzV24Tv7tK+jpUVj4xnDQQZOt' +
                                        'iwWmzo2WZdzO3WczRwmd+pNqmMUdUw3wqt56bURdk/6XjgoejrVdQVuSeMqSeslGcPXqUtRwNNKPoRXDFItpWAlWKguKoN' +
                                        'ew0jxyic6bg+FQr9J9xypOI5za8dtxpjJSRbDS+RnCbYVrnq2irIs67cdt4nI5cXca5Tv73s+70nPrdYj4LnxidixCdgH' +
                                        'VsX3olTfO44LX6jhmXVPs3rbqrjp+BAOWjY0beCZdU9z4Qs1fOORr6cdFEF4gci9FuzJwysfigvC/K6fDU0beHjlQ5z1' +
                                        'v2cmDYpiWWUW5y0+h9tevY3lG5fT2Nr+/GhsbeTV' +
                                        'Da8y/XfT8r+CdcSX7zqIB998MG6Ir7G1MdpzlK4pex3GyIEjAWjyN/HXNHK3+pPY3hMDwzHMsWChZ' +
                                        'bPUgiarDon+g48seKKL4GQ' +
                                        'zsDjZ+ynbYvi6qeMx6pjOHCZH/9VxdiQY+3rS6wovMy+N3h6Xd1O2AV6OBoZt/y7nGlPHJstwYxYfq1icTx2zOtzXWeZy' +
                                        '3gYyKtLoOM5VHbcZY6b6fL653W1kTU3NyiRlEe7u6mHR0NDwE2NMXP6HiGzsqlK56hkXXXTRKx1/t8aYUbZtLyhUm9KRz' +
                                        '+97Pu9JjwyltfEC4eG0tun7sStgJ6qZtvCd+7tcxbq7znkuR8XNDfxsydVc8+pVeM0ebquXcNTi2Hu+mdbp7CuyX/QS4A' +
                                        'cPf79bxwNM22969Oc/rX+eoBfs9jn7jDwUWxW4ojurXhs42cDJ2J3fSHHNzWKoSesCd7BM6ticbOacgeEGFna6fi+QapgQ' +
                                        'wIK7Et1XAwemLpsdr6amZqXP51tojIlLODTGX' +
                                        'Ofz+b7iOM6Pkw0zNDQ0nC0i04C3amtrEz5YHMf5L9d1lxIzJGaMGeU4zt/nz59/fqIk7UgZhUQrBl+YwUdTeWZZ1iUi8n+x' +
                                        '24wxMxo' +
                                        'aGlaKyOVJEpIBWLBgwQTXdY8TkTNra2sPTbZfruX7+56ve9KjgRGEp+/bpeH/YZZ+vBRPPCxjccDQAyi3y2l1uzndvMCM' +
                                        'bbAH25iAw' +
                                        'Wv2kGBeMkZ6xPSYwGjRah1Gi+OyR04DAOEObuvZOmkCmwW+nklVeoFbTBrlTXqhP2VzkMB3Mj2mtrb2XJ/Pt1/HHhpjzF' +
                                        'TXdf/t8/mW0T6jpxLYL5IUPdAYg4hMARI+KGpqalY2NDRcC9zZ4a1qEfm/hoaGVSLyfGTb/saYQ+mcVwRwSaqHiup5F1100' +
                                        'SsNDQ2XkOB3a4x5yufzbQT+DdEJHNHvjuu6AwGMMcyfP//InixFk8/ve77uSY8Xvoidvt/qtrL28zVAeB2iA6uSD+X3Nlap' +
                                        'hbObU1TlRTJRXTWB6qpwykggF' +
                                        'OCZFZp4HSeckJsTHsz2buOyXJ0vHSK8nGlQBMA86kWSr8OU8prhocLiFL4PnRcq64KB4dnMTnRd99siknDY1Bgz2RgzO/L' +
                                        'vnMgDJa4HKNV6MJHhr0uSvF0dc+6pJAmKdAitOKX63RpjRhljpqb67gB4nvfDnmhrrEJ937O9JwV5ZIcC7dP3l3QxnNarm' +
                                        'ZjyIruEp/f3FrG9RX997680Nzfh+TMZNOjjwvXPZpDFw7SNwOOey6Fp5ffkiMBmD2bLbRyVcVDUdg7DiV3VfevgXs/l0D' +
                                        'QTvAvGg0syDPru9WCPbIY/Z82atbW2tvabInI9pH+8iGwEzunqL/6ZM2f+SkROIsEU/hTnXmaM+YoGRcWt7XebJJ8slWYR' +
                                        'uct13bq8NCyFnvq+5+qe9PhQGgBe+/T9pR8v4Qf7/hcQXujxnrfuKUiT8sqAPbBter+H9IIAIza/aNG/wrO43SYXMzRxiZ' +
                                        'd+aR5PevAk8EPmMBmbwy1hLzHsgzC+Y6K1CC8bw1oP/g' +
                                        '68kMtVpiM9QH9pmykX9x48boT3PeHZtJcVSGUezQKnyBwmWxbfEzgkNrlbhHeMYUmnz3kZA8VKnqNUcOHPdZTUMd2C74gwJ' +
                                        'fZ3mI/fX21t7dz6+nqf4zjfF5HvAF+KVAmPXFM2Ah8Br1qW9ceZM2emPQQSGQp7OjIr7WTCQwixwxnNIrI' +
                                        'ym3OrwkrjdwuwSk' +
                                        'Q+JDyMtLgYhkYL/H2HNO+JsW4qUEeGAafcYcrIKfztjHDu1OptqzhwYf5KZrReEgDCSwFU3zsub9fpihfwcBtd6LzuZVEYMX' +
                                        'AEH169kcj4LnvePIpNzZsAMAMtnF3yk10rIo8F5oROzcvJ+4I6ZllJ8nsEHpd5nNLTTVJKqb6mcNkvAm7I462tb0VXwB47eB' +
                                        'zldnnBmtRTrNLI8Nqg+PIixWLaftPbZw7+Z2k0KAKQ7YlLvCillFJ9QUHTgiXo0RJq4Z1P3g43xlh9KgG7K/YAi9KqEqwBxZ' +
                                        'V/lGgYLUrAbS7+oUCllFIqG4XJMYrhBjyWfL' +
                                        'yUA6vCideHjpySt3pc5XeW5uW83WKBPai9vIgEChsiDSwbyDe++I3o6yc7BkaAtHjILhbGKcLuLqWUUqobCj6RXFyPFVvaS1' +
                                        'hMGTmlgK0pHOMYnN0c7CE2hVwg74QJ36bUCQeQq7auYtXWxCVtQk1FmiCllFJKdUPBAyOANz56I/pzn5uynyGrzKJkaAnWw' +
                                        'MLkH8UOoyXqLYoKCG6rDqkppZTqWwo+lAawYtNyWoItVJRURBOwU62Aver8NYweNLr9+K3LmfKH9hW9l5y1lIkxtdca/Y0' +
                                        'Mb4gvFbR55lbWN73Ppy2fcfReR0e3tw23tc1gS3T+hcf/jtMnnMGFL9Rw9zHtZVle/OBFTnjsOJ495fm4c174Qk2n0iY3' +
                                        'f/UW5hzSvqZf3Ew5A78/9fecPuEMfrToAv57WngJgwfffDBa6uPnx99K3VHxy1Fc8OgPuW/ZvQnf37BtA1/8xd6kUmKXc' +
                                        'Hz18dHXnfKLOvCaXKwynb6vlFKq7yiKHqPWUCtvbX0LCCdgHz' +
                                        'oyeSmXtoCl/M7S6L9Ym2duZe9B+8S9/7n/c1ovCXDO/vH1HtuCp7b9Gv2NbJ65ldZLAlz4Qg3ld5Zy' +
                                        'x2u3M7FqEguP71yt4e5jF' +
                                        'kSPfXjlQxy919Fsnrm' +
                                        'V3St2i27f0LSBW782L+64hcf/jjmHXMYdr90e3W9w2WBWnb+m0zVuO+52ap7/Ec41VjQo+vMFf6HuqDrmvTQP+wqDfYVh8dr' +
                                        '2RUV/f/oDnd4fXDGY9366Pul9BTh6zFQGlQ8C4OOmj1nywT9T7o8H7g7tNVJKKdV3FEVgBLB8U3ue0aFJ8oxWnb+GRn9j' +
                                        'pzWI2npznj3leSrLKjv1DlXfO45GfyMXTboobnujv5ETHjsu+vq595+lsqySFz94MdrDc/Xfr2JD0wa+tPuXOrXn4ZUPRX' +
                                        '8+57mzafQ3UllWGde79OjqP1JZVhkXlJ0+4Qxe/OBFrv57e+Hh3759D6MHjebmr8YvDvzc+8/yu38vDOcfDbb5+bdvZe' +
                                        'rYqTz45oNc+dwV0f2Oveeb0d6iMw86k8VrF8e9v+CfCxg9ZDQ/P/7WTp+jTeww2lPvPpV0v1iyQ6fvK6WU6juKJjBa8l' +
                                        'F778TEqsR5RqMHjea5959Neo4xg8ewYuvyhO+tb3qfvQft02lbrI+2f' +
                                        'wTAm1veoKPBZUM6bXvpPy/Fvf7c/zkbmjYkvP64IeFgri3w+Z9Vj8S93xYk7bHrHomvYcAqtzhk70No9Ddy1iPfT3idtsDn' +
                                        '4eUPxW1vC5L2rNwz4XEldgkn7XtS9HVXw2hROn1fKaVUH1IUOUYA/4wJjBL1GHUcBktkcNlgPvdvS/jepy2fdQqMCqE' +
                                        't8Ln7mAVx+Ulthg1IXS1h94rdACgZ6iQsL9IW+Nxz6m+559Tfdjp++MDE5z96zFRGDhoJQFNrEy+uS1jvLyFp8fAq' +
                                        'DFZp0cTZSimlVFaKJjBa/emqaAL26EGjGT5gOJt3ZlaM+3P/50nfawsoCq2tVypRQnYmjG1whth4AYPb5EIovP3Dxg' +
                                        '+B+ETsdMQOoz3xrycIusGM2uM1e1i7a2CklFKqdyuaJ5kgvLXlrejrjtP2F75zPxuaNnD4qCOSnmPd5+viZqPF2nvQ' +
                                        'Pry++fXcNLYb1mwLJ1gf9YWjsjr+Lxv+QmVZZXRIziqNTO+vtMGCNZ+sBuAbY45OdZpOYofRHln+cMbtkqBO38+7ed' +
                                        'R78zCJ/mmdNKWUyo2iCYwgfjjtgN07lwZ5dPUfGT1oNEvOil8Zu+11WyL15plb495fdf4aKssq4xKtC2XhO/fz4gc' +
                                        'vcvqEMzolWndsdyJtyeBzDrksbnjxT2f9mQu+8SMWvns/i9cu5syDzuyUaP3Z9Yl71KbsdVjWw2ixvCYXEU3EVkop' +
                                        'lTvz588/cv78+Ufm4lwLFiyY0NW5imYoDdoSsGcDcOiIKYhI3Bo5V//9Kq7++1W0XhKIW2codnZY+Z2lrDp/Tdz7G' +
                                        '5o2FFU5kLa1juYcclncWkZ3vHZ7WsdX3zuOZ095Pi5PqW2GnT3Q5oQnjuPZk5+n7qi6uLWM5r00L+H5YofRnlv1X' +
                                        'MbDaFEeeDs87F0LuHS3UkqpXm/BggUTQqHQLcaYGW1/cDc0NCAiC2tra7tOOu7A5/P9CjjNdd1RMed6wnXdmlmzZ' +
                                        'sX1ShjrpuKpX1q9+wTevfDfAGzesZk9faOwS/Qhmy3P74Xzj7qo3vHuZSuprqoG4MwHz+CRFZkPpcVyqhyMnfmijy' +
                                        'LyWGBO6NRuXVwppVRB+Hy+xyOBTKfgZf78+UeKyP8BzaFQaEzHYCRWfX19leM46yD8XDDGvCQi+wAXGGNGichdtb' +
                                        'W1P8miXcuMMQ9GNl8IVAOrZs6cOSF2/6LqMYpNwB6+y3CqSofxqfsJxtKVlbNhlVlYVRbuTg+32cUkCIGrqyZEg6J' +
                                        'AKMCzK/+329d1m1ycIUX11VJKKZV/9wMzgGM7vuF53mnGGETkL6mCIoBZs2ZtbWhouNa27edramqiBTt9Pt/rwFP' +
                                        'GmPOAtAKjhoaGs4EZIrKstrY2ushgfX39A7ZtLzfGVDc0NPxk5syZv2p7r6hyjARh6cft+UOThk/CDWqx0u6yB1i' +
                                        'UVpVgVVidugenxwyj/fW9v9Lsb+729cQveAFNxFZKqf6ktrb2aRHZaIwZ1TGPxxhzHIBlWXekc66ZM2f+KjYoajt' +
                                        '/5MeBGTTrysj1fbEbI8HZPQAicmbse0UVGAH888P2BOzD9jwMcQXP1Ydst1lgV9qU7O5gStp74GLzi9Je1DENni7' +
                                        '6qJRS/dEfATzP+2HbhgULFkwAqkVk40UXXfRKtieOCbYy+Qu+GmDmzJmd63rB6wDGmOIdSgNYsbl95eprv3od137' +
                                        '1ugK2pv8QkZwGRhIU3J0e9oCii72VUkrlieM4d7uuO5uY4bRQKHR6ZCLVH7tzbs/z5rQNx6Wzf319fVXXewEdeq' +
                                        'CK7qkVO2Vf9ZwVHy9nU/OmnJ7Ta3a1jppSSvUjNTU1K0VkcexwmjHmdAgHTdmed/78+UcaY2ZEznNVV/tDdLgsY' +
                                        '0UXGG1oXM/mHZmteK2678rFV+Z+eqKEp+8rpZTqP4wxz0B4OC1mGG1Zx5yhdEVmtD0HICLXZ3OeLtYuWhX7ouiG' +
                                        '0gCWb17Ot774LQDOfOIMHnk3PH3ccizsUp2+ny/ObjZes4cEcxcieTs8rAFWVtP3lVJK9T4zZ878VUNDww3Asa7r' +
                                        'rgCImSafkZigaKCIPFFbWzs3k+MjU/Qne553GtAxv+nLkX3+Ebux6HqMAJZvas8zmji8vcSHF/J0aCaPrFILZzcHe' +
                                        '7ANOQxk3CadWaiUUv2JiPzFGDOK8HpBhEKhBzI9R0NDw9ltQRFwSW1t7cnJ9vX5fI83NDRIQ0ND3DT+toDMGHNeb' +
                                        'M5RfX19lTHmUqDZcZy4MhFF2WO0JCbPaNKI+NpnbtDFKSvKZvcNBqxyC6vMwt3u4u7w6G6IJH7B83tYZUUZhyull' +
                                        'Moxy7LuEJEZhIfRnsgk3yey6vVvgKkAIrIY2DuyejUAxpj1bWsPLViwYILrujMi+54JRPebOXPmr3w+39eMMTMcx1' +
                                        'nn8/keAxqB04gEXB2H5orySRWbgH3w8IMxMY9mnb7fQwzYA21KqhxMDgIaV+uoKaVUvxGZlr8KwBizKJNjPc/b3Rg' +
                                        'zte21MWaqMWZ27L/YtYciCd/LgOaO6xUB1NbWniwid4lIszHmHGPMbODfInJS7MKO0esVU0mQWBt/sonhuwwH' +
                                        'YN+7v8SqT2MCOgNOuRNXR03llxeIlBcJZX8Oa5CFPSB5jpiWBFFKKVVoRTsmFZuAPWn4pPjASMBzPWyndyViX3fE' +
                                        'XK6cktYswx5z52u/5Mq//7TL/axSC2to6vIiXfGaPaxyS0u8KKWUKlpFOZQG8XlGsQnYbbyAp0MzBRAtLzKgc3mRL' +
                                        'un0faWUUkWuaHuMOpYGScQLer1q+v71r87l+lczmmlYnCywB9lYA6xw7lAg/RDJ2+FhVVgYR3uNlFJKFZ+i7TFaH' +
                                        'lMa5NCRh8YlYLfR6fuFZRwTnt4/xIYM4tOQTt9XSilVpIo2MNq8YxMbGjcAUFFSwfjdqxP' +
                                        'uFwroQ7bQrDKLkqElWANtJJ2OoEB4+r5SSilVbIo2MIL4afuH7ZF4OA1Pp+8XBQP2LhYlVSVYFV3nH+n0faWUUsW' +
                                        'oaHOMAFZsXs739v0eAFP2OIzfvbUw4X5uwMWUm4yn75c75Xx+cVO329lbpDsDrTuMBXZlTP5RsvIiLngtXsrp' +
                                        '+0oppVRPK+oeo9jSIJMSzEyLEnBD2mtUTEyJwdk9dXkRr1lzxJRSShWXou4xen3Ta3jiYRmLA4cdiMEgSQZp' +
                                        'JOghjpVRr1FrqJXyO0tz1VyVQLS8yA4Pd0eH9Y8E3GYPp1J7jZRSShWHou4x+mTnJ6z5bA0QTsA+cPjElPu' +
                                        '7Ae01KkoG7F0tSoY6WOXx+UfS4iEh7TVSSilVHIo6MIL4aftJE7AjxNWhmWJmbIM92MbZzY7rq9Tp+0oppY' +
                                        'pF0QdGK2ICo0QrYHfk6vT9omeVRq' +
                                        'b3V9rhb6BO31dKKVUkijrHCOKn7NccXEPNwTUFbE3/sftvhrAjuCOv17ArLOxyC3e7G841GmIXfaCulFKqby' +
                                        'v6wGjJR/+MJmCrPsiAPdDGGiB4IdFMeKWUUgVlYfh1oRuRSmuolbXb1ha6GSqPBPlMbHNxyO9OL3RblFJK9W' +
                                        '/hue03so+x+L0RjixwexIat9s4Nm3fRHOgOaPjnAon40UfVc8RkZBAQ9CErudSPit0e5RSSqn4qOFGjrMs7kUYVa' +
                                        'D25JRxDE5p0Y8W9lPysnihCwOXsbLQLVFKKaXadO5OmYuDzcXGcLOBigK0KafsMhtLc3qLyXvieXMCl7lPFrohSi' +
                                        'mlVEfJx5nmsptl82sxnGFS7Vckpo2fzknV05g0fBKThk9i+eblLN+8nKfXLOJ/P/jfQjcvr04ccxInjjmRicM' +
                                        'mMrFqEiu2LmfFlhU8ve5pnl73VKGbB4AgTQZu8juhembhL3R7lFJKqUS6Dnhu5kADvzNC14sIFUBl2WDuO/F' +
                                        '+plcnz9tdtOZJfvTCBTT6G3uwZflXWVbJPcf+lpPGTku6z1NrF3HBn39YsM8uiCDmgYAXnMPlbClII5RSSqk0pd8' +
                                        'TdDNnGuE3BobksT0ZqSwbzH' +
                                        's/fp/B5YO73Pdz/+dU3zuuzwRHlWWVrDp/DYPLivezC7JELDM7+JPgkh69sFJKKZWl9JNvruZBCbGnB7cIBPPY' +
                                        'prTdf9LCtIIigMFlg7nn2N/muUU957ffujetoAgK8dnlQ/G8MwOXhA7XoEgppVRvkllW8lx2cg1XS4gviuFJKW' +
                                        'BZsmnjpzNtfPIhpEROGjuNE8eclKcW9ZxwTlFmn6MnPrsgOwW5zr9LqDpwmfsQBi1cp5RSqlfJbrrWXD6Uq5k' +
                                        'hhilieC/HbUrLtBQ5RamcNLb3B0bZfoZ8fnYReSzghKoDl4ZuoIadebuQUkoplUfdm8d+DUslyDjPcIFAZqs' +
                                        'vdtOkNArKJnLA0ANz3JKeN7FqYlbHHViV+88uwgoXOSowJ3Qqs/gw5xdQSimlelDupuHfykDL5QbxuNiAnbP' +
                                        'zJuFenf0oTdkvS3r1ititlwSyPrb8zlyVI5PNnshVwWZ3IXPxcnRSpZRSqqByt/LhF' +
                                        'TR7V3GJCOPE8ErOzpvEis0rsj7Oc3v3c/ytrdl99myPiyUiIU+k3h8MjQvOce/ToEgppVRfkvsloX/G+3I1' +
                                        'X/EMx2HyN7SyfPPyrI/zAh5SyMzxblqRZYCT7XHt5Hkk' +
                                        'dEBwTmg2V/Ts0KlSSinVE/JXK+Nq/uQF2ceDKwVac336RauyqyjRdpwX7L0dHU+tzW4162yPE2GlixzvvzR' +
                                        '0vNY2U0op1Zflt4jYXEJcwy8kyGiEPwi5m769aPWTLFq9KMNjFrFodSQwCnmI1zt7jZ5e91TGpT6yOUaQz' +
                                        'zy4ONAcPCB0aej5jA5WSimleqGezUAOlxe53wgH5+J0lWWDef/i9VSWVXa5b6O/kX1+vTeN/s+j24xtcM' +
                                        'qcXDSlx1WWVbL6/LVpf/bx945Ne+VrEfEM5l6/Cf6US/msu21VSimleoueLTt/NW/J1XzZM3xfpPsP3E' +
                                        'b/5+zz67277DlatHpRp6AIQFzptYnYbcFOV71AT697KqOgCORlIXSwf07wRxoUKaWU6m8KN2d9LgNwuN' +
                                        'LAFQZKunu6aeOnM616OpOGT2Li8Ims2LyC5ZuXs2jVk9Hhs4QMOOVOr56+f+KYkzhp7ElMrJrIgVUTe' +
                                        'WvrClZsXcFTazMaPntPPG9O4DI3u+QtpZRSqg8ofDQwlz2Nwz0GjitUE6xSC9vJ+9JLRUmQncCtASd0' +
                                        'K7PwF7o9SimlVCEVPjBqcxNfM4Z7jTC2EJd3Knp3r1GmBBHEPBAoCV6pK1YrpZRSYc' +
                                        'UVCczFopRzjccvDQzqyUsb28Ip6x+9RoIsEcvM1sr3SimlVLziCoza3MpAK8CtAjXG9FyCuFPuYKzi' +
                                        'vCW5IR+KJ3WB' +
                                        'Oe7DaOV7pZRSqpPijgJupNpY3GOEr/bI9SxDSXnvnL6fiiB+4M7ALqEbtfK9UkoplVxxB0ZtbuZbRr' +
                                        'jHwBfyfSm7zMaye3YVg3wSkccCVqiOS3iv0G1RSimlil3vCIwA5uLgcKmB6w2U5+06fWD6PoAIKzw' +
                                        'js0OXhl4udFuUUmTO8jMAAAL8SURBVEqp3qL3Pf2vY5jlcIcYvm/y1H5TYuGU9M5EbEE+E8x1waZgA' +
                                        '1r5XimllMpI7wuM2tzMgUb4g4ED8nH63jZ9X0RCAg1BE7peV6xWSimlstN7nvyJCIabOd0IvzGG3' +
                                        'XJ56t41fV+eFy90iVa+V0oppb' +
                                        'qndwdGbXJcXqRNsSdii7DSM3JJSCvfK6WUUjnRNwKjNuHyIgsMnJCL0xnL4BTh9H1Bmgzc5G8K3c' +
                                        'lcQoVuj1JKKdVX9K3AqM1NfM3Abw2M6+6prFIb2ymOXiMR8QzmXr8XvIbL2VLo9iillFJ9Td8M' +
                                        'jCB35UWKZvq+vOxJaHZwDisK3BC' +
                                        'llFKqzyr00z7/clBepLDT9yNlPC5zHypQA5RSSql+o+8' +
                                        'HRm3C5UUWGOHr2Rze03XUBNkJ3BrYJXS7lvFQSimlekb/CYza3My3DNxnhFGZHGZsg1OW/0RsQ' +
                                        'QQxDwRKglcyiw/zfkGllFJKRfW/wAignjKamG2E641Jv7xIvqfvC7JELDM7+JPgkrxdRCmllFJ' +
                                        'J9c/AqE24vMhtYvhBOuVF8jd9XzZ7Il' +
                                        'cFL3XvxyB5uIBSSiml0tC/A6M24fIi/8/AxK52zeX0fUH8wJ2BYOgWrqA5JydVSimlVNY0MG' +
                                        'rTXl6k3hiGJt0vR9P3ReSxgBWq4xLe69aJlFJKKZUzGhh1NJcBVglzRbjEQMJxM8uxsEuzm74f' +
                                        'KeNxYejS0MvdaqdSSimlck4Do2R+zheNy10GvpPo7Uyn7wvymWCuCzYF79YyHkoppVRx0sCoK+H' +
                                        'yIv9toDp2c7rT90UkJNAQNKHruZTP8tZOpZRSSnWbBkbpmIuFw0wj/NwYdm3b3PX0fXlevNAlgc' +
                                        'tY2QOtVEoppVQ3aWCUibnsZpVwg3hcZAxWikTs91ykNnRp6PlCNFMppZRS2dHAKBs3Um0Mdxs4yp' +
                                        'Ra4ji2ARCkycBNfidUzyz8hW6mUkoppTKjgVF33MhxxnB7SXmJawxL/F7wGi5nS6GbpZRSSilVOH' +
                                        'PZq9BNUEoppVT3/X+QUZFEsapRLgAAAABJRU5ErkJggg==',
                                }
                            ]
                        },
                        {
                            alignment: 'left',
                            width: '30%',
                            stack: [
                                {style: 'h1', text: 'INVOICE'},
                                {style: 'h2', text: ''},
                                {style: 'h2', text: this.invoice.storeAddress},
                                {style: 'h2', text: this.invoice.storeTelephone},
                                {style: 'h2', text: this.invoice.storeEmail},
                            ]
                        }
                    ],
                }, '\n', // optional space between columns

                {
                    canvas: [
                        {color: '#D3D3D3', type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 0.5}
                    ]
                }, '\n',
                {
                    columns: [
                        {
                            width: '25%',
                            stack: [
                                {style: 'shipping', text: 'Shipping address'},
                                {style: 'h2', text: ''},
                                {style: 'h2', text: this.invoiceDetail.shippingCompany},
                                {style: 'h2', text: this.invoiceDetail.shippingAddress1},
                                {style: 'h2', text: this.invoiceDetail.shippingAddress2},
                                {style: 'h2', text: this.invoiceDetail.shippingCity},
                                {style: 'h2', text: this.invoiceDetail.shippingZone},
                                {style: 'h2', text: this.invoiceDetail.telephone},
                            ]
                        },
                        {
                            width: '35%',
                            stack: [
                                {style: 'billing', text: 'Billing address'},
                                {style: 'h2', text: ''},
                                {style: 'h2', text: this.invoiceDetail.shippingCompany},
                                {style: 'h2', text: this.invoiceDetail.shippingAddress1},
                                {style: 'h2', text: this.invoiceDetail.shippingAddress2},
                                {style: 'h2', text: this.invoiceDetail.shippingCity},
                                {style: 'h2', text: this.invoiceDetail.shippingZone},
                                {style: 'h2', text: this.invoiceDetail.telephone},
                            ]
                        },
                        {
                            width: '20%',
                            margin: [40, 0, 0, 0],
                            stack: [
                                {style: 'detail', text: 'Invoice No'},
                                {style: 'h2', text: ''},
                                {style: 'h2', text: 'Issue Date'},
                                {style: 'h2', text: ''}
                            ]
                        },
                        {
                            width: '20%',
                            stack: [
                                {style: 'invoice_d', text: this.invoiceDetail.orderPrefixId},
                                {style: 'h2', text: ''},
                                {
                                    style: 'invoice',
                                    text: this.datePipe.transform(this.invoiceDetail.createdDate, 'dd/MM/yyyy')
                                },
                                {style: 'h2', text: ''},
                            ]
                        },
                    ]
                }, '\n',
                {
                    canvas: [
                        {color: '#D3D3D3', type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 0.5}
                    ]
                }, '\n',
                {
                    text: 'Order Details', style: 'order'
                }, '\n',
                {
                    table: this.dynamicBody
                }, '\n',
                {
                    columns: [
                        {
                            width: '80%',
                            alignment: 'right',
                            stack: [
                                {style: 'h2', text: 'Total Amount'},

                            ]
                        },
                        {
                            width: '20%',
                            alignment: 'right',
                            stack: [
                                {style: 'h2', text: this.invoiceDetail.total},

                            ]
                        }
                    ]
                }

            ],
            footer: [
                {
                    margin: [0, 0, 0, 10],
                    table: {
                        body: [
                            [
                                {border: [false, false, false, false], text: 'Note: ', style: 'note'},
                            ],
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'dummy content',
                                    style: 'content',
                                    margin: [0, 0, 0, 0]
                                }
                            ]
                        ]
                    }
                }
            ],
            styles: {
                h1: {margin: [0, 10, 0, 0], fontSize: 16, bold: true},
                detail: {margin: [0, 10, 0, 0], fontSize: 10, bold: false},
                shipping: {margin: [0, 10, 0, 0], fontSize: 12, bold: true},
                billing: {margin: [0, 10, 0, 0], fontSize: 12, bold: true},
                h2: {margin: [0, 5, 0, 0], fontSize: 10, bold: false},
                invoice: {margin: [0, 5, 0, 0], fontSize: 10, bold: true},
                invoice_d: {margin: [0, 10, 0, 0], fontSize: 10, bold: true},
                order: {margin: [0, 0, 0, 0], fontSize: 12, bold: true},
                total: {margin: [0, 5, 0, 0], fontSize: 10, bold: true},
                note: {margin: [0, 0, 0, 0], bold: true},
                content: {margin: [0, 0, 0, 0], bold: false, fontSize: 10},
                th: {margin: [0, 10, 0, 0], bold: false, fontSize: 10},
                td: {margin: [0, 10, 0, 0], bold: false, fontSize: 10}
            }
        };

        this.pdf = pdfMake;
        this.pdf.createPdf(this.docDefinition).download('invoice');
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
