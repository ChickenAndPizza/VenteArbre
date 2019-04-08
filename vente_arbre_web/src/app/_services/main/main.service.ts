import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiUrl = 'http://localhost:5000/api/';
  headers: any;

  protected http: HttpClient;

    constructor(@Inject(Injector) injector: Injector) { 

        this.http = injector ? injector.get(HttpClient) : null; 
        this.headers = {'Content-Type': 'application/json; charset=UTF-8'};
    } 
}
