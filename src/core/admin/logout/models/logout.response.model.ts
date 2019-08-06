export class LogoutResponseModel {

    public user: any = {};

    constructor(logoutFormResponse: any) {
        this.user = logoutFormResponse || '';
    }

}
