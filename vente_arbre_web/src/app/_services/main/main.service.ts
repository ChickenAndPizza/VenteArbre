import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'app/_models';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiUrl: String;
  headers: any;


  protected http: HttpClient;

    constructor(
      @Inject(Injector) injector: Injector) {
        if(AppConfig && AppConfig.settings) {
          this.apiUrl = AppConfig.settings.apiUrl;
        }
        this.http = injector ? injector.get(HttpClient) : null; 
        this.headers = {'Content-Type': 'application/json; charset=UTF-8'};
    } 
}
