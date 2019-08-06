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
import * as zoneActions from '../zone/zone-action/zone.action';
import * as countryActions from '../country/country-action/country.action';
import {Subscription} from 'rxjs/index';
import * as store from '../../../../app.state.interface';
import {Router} from '@angular/router';
import {ZoneForm} from './zone-model/zone.model';
import {
    getnewzone,
    getupdatzone,
    getzonedelte,
    getzonepagination,
    getzoneslist,
    ZoneAddFailed,
    ZoneAddLoaded,
    ZoneAddLoading,
    ZoneCountFailed,
    ZoneCountLoaded,
    ZoneCountLoading,
    ZoneDeleteFailed,
    ZoneDeleteLoaded,
    ZoneDeleteLoading,
    ZoneListFailed,
    ZoneListLoaded,
    ZoneListLoading,
    ZoneUpdateFailed,
    ZoneUpdateLoaded,
    ZoneUpdateLoading
} from './zone-reducer/zone.selector';
import {ZonelistForm} from './zone-model/zonelist.model';
import {CountryListForm} from '../country/country-model/countrylist.model';


@Injectable()
export class ZoneSandbox {
    public getzoneslist$ = this.appState.select(getzoneslist);
    public getzonepagelength$ = this.appState.select(getzonepagination);
    public getnewzone$ = this.appState.select(getnewzone);
    public getupdatezone$ = this.appState.select(getupdatzone);
    public deleteZone$ = this.appState.select(getzonedelte);

    public zoneListLoading$ = this.appState.select(ZoneListLoading);
    public zoneListLoaded$ = this.appState.select(ZoneListLoaded);
    public zoneListFailed$ = this.appState.select(ZoneListFailed);

    public zoneDeleteLoading$ = this.appState.select(ZoneDeleteLoading);
    public zoneDeleteLoaded$ = this.appState.select(ZoneDeleteLoaded);
    public zoneDeleteFailed$ = this.appState.select(ZoneDeleteFailed);

    public zoneCountLoading$ = this.appState.select(ZoneCountLoading);
    public zoneCountLoaded$ = this.appState.select(ZoneCountLoaded);
    public zoneCountFailed$ = this.appState.select(ZoneCountFailed);

    public zoneAddLoading$ = this.appState.select(ZoneAddLoading);
    public zoneAddLoaded$ = this.appState.select(ZoneAddLoaded);
    public zoneAddFailed$ = this.appState.select(ZoneAddFailed);

    public zoneUpdateLoading$ = this.appState.select(ZoneUpdateLoading);
    public zoneUpdateLoaded$ = this.appState.select(ZoneUpdateLoaded);
    public zoneUpdateFailed$ = this.appState.select(ZoneUpdateFailed);

    private subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>, private router: Router) {
        this.subscribe();
    }

    public addNewZone(data) {
        this.appState.dispatch(new zoneActions.DoNewZoneAction(new ZoneForm(data)));

    }

    public updateZone(value) {
        this.appState.dispatch(new zoneActions.DoUpdateZoneAction(new ZoneForm(value)));
    }

    public getZoneList(value: any) {
        this.appState.dispatch(new zoneActions.GetZoneListAction(new ZonelistForm(value)));
    }

    public zoneDelete(value) {
        this.appState.dispatch(new zoneActions.DoZoneDeleteAction((value)));
    }

    public getzonepagination(value) {
        this.appState.dispatch(new zoneActions.GetZoneCountAction(new ZonelistForm(value)));
    }

    public getcountrieslist(value: any) {
        this.appState.dispatch(new countryActions.GetCountrylistAction(new CountryListForm(value)));
    }


    subscribe() {
        this.subscriptions.push(this.getupdatezone$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/settings/zone']);
            }
        }));
        this.subscriptions.push(this.getnewzone$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/settings/zone']);
            }
        }));


    }

}
