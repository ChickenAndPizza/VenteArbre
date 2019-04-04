import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { CustomerOrder } from 'app/_models/customer-order';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class CustomerOrderService extends MainService {
    constructor(injector: Injector) {
        super(injector);
    }

    getCustomerCart(id: string): Observable<any> {
        let url = this.apiUrl.toString() + "CustomerOrder/" + id;

        let headers = new HttpHeaders();
        headers = headers.set('Access-Control-Allow-Origin', '*');
        return this.http.get<any>(url);
    }
}