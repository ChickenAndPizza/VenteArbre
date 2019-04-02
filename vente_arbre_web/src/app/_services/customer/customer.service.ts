import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }


  getCustomer() {
    const url = this.apiUrl.toString() + "Customer";
      return this.http.get(url);
  }

  addOrUpdateCustomer(newCustomer: any): Observable<any> {
    const url = this.apiUrl.toString() + "Customer";
    return this.http.post(
      url,
      JSON.stringify(newCustomer),
      {
        headers: this.headers
      }
    )
  };

  validateEmail(id: string, email: string) {
    let url = '';
    if(id){
      url = this.apiUrl.toString() + "Customer/Email?id="+ id + "&email=" + email;
    } else {
      url = this.apiUrl.toString() + "Customer/Email?email=" + email;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<boolean[]>(url);
  }
}
