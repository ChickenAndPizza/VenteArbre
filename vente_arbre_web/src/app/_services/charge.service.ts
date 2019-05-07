import { Injectable, Injector } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { MainService } from './main/main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  charge(stripeToken: any, amount: number): Observable<boolean> {
    const url = this.apiUrl.toString() + "Charge";

    const formData: FormData = new FormData();
    formData.append('stripeToken', stripeToken.id);
    formData.append('amount', amount.toString());
    formData.append('email', stripeToken.email);
    const upload = new HttpRequest('POST', url, formData);
    return this.http.post<boolean>(url,formData);
  }
}
