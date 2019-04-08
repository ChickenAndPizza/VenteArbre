import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class CustomerOrderDetailService extends MainService {
    constructor(injector: Injector) {
        super(injector);
    }

    addOrUpdateCustomerOrderDetail(newCustomerOrderDetail: any): Observable<any> {
        const url = this.apiUrl.toString() + "CustomerOrderDetail";
        return this.http.post(
          url,
          JSON.stringify(newCustomerOrderDetail),
          {
            headers: this.headers
          })
    }
    
}