/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as store from '../../../app.state.interface';
import {Router} from '@angular/router';
import * as roleActions from './role-action/role.action';

import {Subscription} from 'rxjs/index';
import {ToastrManager} from 'ng6-toastr-notifications';
import {
    getroleCount,
    getRoleList,
    getupdaterole,
    newRoleStatus,
    RoleAddFailed,
    RoleAddLoaded,
    RoleAddLoading,
    RoleCountFailed,
    RoleCountLoaded,
    RoleCountLoading,
    RoleListFailed,
    RoleListLoaded,
    RoleListLoading,
    RoleUpdateFailed,
    RoleUpdateLoaded,
    RoleUpdateLoading
} from './role-reducer/role-selector';
import {RoleForm} from './role.models/role.models';
import {RoleListModel} from './role.models/role-list.model';

@Injectable()
export class RoleSandbox {
    private subscriptions: Array<Subscription> = [];

    public getRolesList$ = this.appState.select(getRoleList);
    public getRoleStatus$ = this.appState.select(newRoleStatus);
    public getupdaterole$ = this.appState.select(getupdaterole);
    public roleCount$ = this.appState.select(getroleCount);

    public roleListLoading$ = this.appState.select(RoleListLoading);
    public roleListLoaded$ = this.appState.select(RoleListLoaded);
    public roleListFailed$ = this.appState.select(RoleListFailed);

    public roleCountLoading$ = this.appState.select(RoleCountLoading);
    public roleCountLoaded$ = this.appState.select(RoleCountLoaded);
    public roleCountFailed$ = this.appState.select(RoleCountFailed);

    public roleAddLoading$ = this.appState.select(RoleAddLoading);
    public roleAddLoaded$ = this.appState.select(RoleAddLoaded);
    public roleAddFailed$ = this.appState.select(RoleAddFailed);

    public roleUpdateLoading$ = this.appState.select(RoleUpdateLoading);
    public roleUpdateLoaded$ = this.appState.select(RoleUpdateLoaded);
    public roleUpdateFailed$ = this.appState.select(RoleUpdateFailed);


    constructor(protected appState: Store<store.AppState>, private router: Router, private toastr: ToastrManager) {
        this.subscripe();
    }

    public getRolelist(value: any) {
        this.appState.dispatch(new roleActions.DoRoleListAction(new RoleListModel(value)));
    }

    public addRole(value) {
        this.appState.dispatch(new roleActions.DoNewRolerAction(new RoleForm(value)));
    }

    public getpagination(value: any) {
        this.appState.dispatch(new roleActions.GetRoleCountAction(value));
    }

    public updateRole(value) {
        this.appState.dispatch(new roleActions.DoUpdateRoleAction(new RoleForm(value)));
    }

    public subscripe() {

        this.subscriptions.push(this.getRoleStatus$.subscribe(data => {
            if (data && data.message) {
                if (data.status === 1) {
                    this.router.navigate(['/settings/role']);
                }
            }
        }));

        this.subscriptions.push(this.getupdaterole$.subscribe(data => {
            if (data && data.message) {
                if (data.status === 1) {
                    this.router.navigate(['/settings/role']);
                }
            }

        }));

    }
}
