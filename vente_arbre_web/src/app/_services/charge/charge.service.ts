import { Injectable, Injector } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from '../main/main.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }


  charge(stripeToken: any) {
    const url = this.apiUrl.toString() + "Charge";
    return this.http.post(
      url,
      stripeToken,
      {
        headers: this.headers
      }
    );
  }
}
