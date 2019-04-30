import { Injectable, Injector } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from '../main/main.service';

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

  getAdministrators():Observable<any[]> {
    const url = this.apiUrl.toString() + "Customer/GetAdministrators";
    return this.http.get<any[]>(url);
  }

  setNewAdmin(email: string):Observable<any> {
    const url = this.apiUrl.toString() + "Customer/SetAdministrator?email=" + email;
    return this.http.get<any>(url);
  }

  deleteAdmin(id: string):Observable<any>{
    const url = this.apiUrl.toString() + "Customer/DeleteAdministrator?id=" + id;
    return this.http.get<any>(url);
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
  }

  validateEmailExisting(id: string, email: string) {
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
