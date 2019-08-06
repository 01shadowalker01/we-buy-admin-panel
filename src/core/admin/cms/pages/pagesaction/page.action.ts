/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../../shared/utility/utilityHelpers';
import {PageslistModel} from '../pages-model/pageslist.model';
import {PagesaddModel} from '../pages-model/pagesadd.model';
import {PagesupdateModel} from '../pages-model/pagesupdate.model';
import {PagescountModel} from '../pages-model/pagescount.model';

export const ActionTypes = {
    DO_PAGES_LIST_ACTION: type('[CMS] Do Pages list pages action'),
    DO_PAGES_LIST_SUCCESS: type('[CMS] Do Pages list Success'),
    DO_PAGES_LIST_FAIL: type('[CMS] Do Pages listFail'),

    DO_PAGES_COUNT_LIST_ACTION: type('[CMS] Do Pages count list Pages Action'),
    DO_PAGES_COUNT_LIST_SUCCESS: type('[CMS] Do Pages  count list Success'),
    DO_PAGES_COUNT_LIST_FAIL: type('[CMS] Do Pages count  list Fail'),

    DO_ADD_PAGES_LIST: type('[CMS] Do add Pages pages customer-action'),
    DO_ADD_PAGES_SUCCESS: type('[CMS] Do add Pages Success'),
    DO_ADD_PAGES_FAIL: type('[CMS] Do add Pages Fail'),

    DO_UPDATE_PAGES_LIST: type('[CMS] Update Pages  pages '),
    DO_UPDATE_PAGES_SUCCESS: type('[CMS] DO Update Pages Success'),
    DO_UPDATE_PAGES_FAIL: type('[CMS] DO Update Pages Fail '),

    DO_PAGES_DELETE: type('[CMS] Do pages Delete pages '),
    DO_PAGES_DELETE_SUCCESS: type('[CMS] Do pages Delete Success'),
    DO_PAGES_DELETE_FAIL: type('[CMS] Do pages Delete Fail')

};

// pages list
export class DoPagesListAction implements Action {
    type = ActionTypes.DO_PAGES_LIST_ACTION;

    constructor(public payload: PageslistModel) {
    }
}

export class DoPagesSuccessAction implements Action {
    type = ActionTypes.DO_PAGES_LIST_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoPagesFailAction implements Action {
    type = ActionTypes.DO_PAGES_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}


// pages count list
export class DoPagescountListAction implements Action {
    type = ActionTypes.DO_PAGES_COUNT_LIST_ACTION;

    constructor(public payload: PagescountModel) {
    }
}

export class DoPagescountSuccessAction implements Action {
    type = ActionTypes.DO_PAGES_COUNT_LIST_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoPagescountFailAction implements Action {
    type = ActionTypes.DO_PAGES_COUNT_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}

// Add Pages

export class DoAddPagesAction implements Action {
    type = ActionTypes.DO_ADD_PAGES_LIST;

    constructor(public payload: PagesaddModel) {
    }
}

export class DoAddPagesSuccessAction implements Action {
    type = ActionTypes.DO_ADD_PAGES_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoAddPagesFailAction implements Action {
    type = ActionTypes.DO_ADD_PAGES_FAIL;

    constructor(public payload: any) {

    }
}

//  UPDATE PAGES

export class DoUpdatepagesAction implements Action {
    type = ActionTypes.DO_UPDATE_PAGES_LIST;

    constructor(public payload: PagesupdateModel) {
    }
}

export class DoUpdatepagesSuccessAction implements Action {
    type = ActionTypes.DO_UPDATE_PAGES_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoUpdatepagesFailAction implements Action {
    type = ActionTypes.DO_UPDATE_PAGES_FAIL;

    constructor(public payload: any) {

    }
}


//  delete pages action

export class DoPagesDeleteAction implements Action {
    type = ActionTypes.DO_PAGES_DELETE;

    constructor(public payload: any) {
    }
}

export class DoPagesDeleteSuccessAction implements Action {
    type = ActionTypes.DO_PAGES_DELETE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoPagesDeleteFailAction implements Action {
    type = ActionTypes.DO_PAGES_DELETE_FAIL;

    constructor(public payload: any = null) {
    }
}


export type Actions = DoPagesListAction
    | DoPagesSuccessAction
    | DoPagesFailAction
    | DoPagescountListAction
    | DoPagescountSuccessAction
    | DoPagescountFailAction
    | DoAddPagesAction
    | DoAddPagesSuccessAction
    | DoAddPagesFailAction
    | DoUpdatepagesAction
    | DoUpdatepagesSuccessAction
    | DoUpdatepagesFailAction
    | DoPagesDeleteAction
    | DoPagesDeleteSuccessAction
    | DoPagesDeleteFailAction
    ;


