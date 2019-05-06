import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from './main/main.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardDescriptionService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  getDashboardDescription():Observable<any> {
    const url = this.apiUrl.toString() + "DashboardDescription/GetDashboardDescription";
    return this.http.get<any>(url);
  }

  addOrUpdateDashboardDescription(newDashboardDescription: any): Observable<any> {
    const url = this.apiUrl.toString() + "DashboardDescription";
    return this.http.post(
      url,
      JSON.stringify(newDashboardDescription),
      {
        headers: this.headers
      }
    )
  }
}
