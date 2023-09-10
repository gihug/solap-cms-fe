import {HttpClient} from "@angular/common/http";

export class ApiService extends HttpClient {
    mUrl: string = 'ParamsKey.SERVER_PORT';

    itemPerPage = Number.isInteger(localStorage.getItem('item-per-page'))
        ? localStorage.getItem('item-per-page') : 10;

    headers = new Headers({
        ["Content-Type"]: 'application/x-www-form-urlencoded;charset=utf-8',
        // thêm phần này vào header thì mới gửi body cho backend được
    });
    // public static _instance: ApiService = null;

    public setItemPerPage(itemPerPage: number) {
        if (itemPerPage) {
            localStorage.setItem('item-per-page', String(itemPerPage));
            this.itemPerPage = itemPerPage;
        }
    }


}
