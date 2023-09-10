import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api-service/api-service";

@Injectable({
  providedIn: 'root'
})
export class AppModuleService {
  private mApiService: ApiService | undefined;
  constructor() { }

  public getApiService(): ApiService {
    return <ApiService>this.mApiService;
  }

  public dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();
}
