import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }


  // getCustomer() {
  //   console.log(this.apiUrl + "Customer");
  //     return this.http.get(this.apiUrl + "Customer");
  // }
}
