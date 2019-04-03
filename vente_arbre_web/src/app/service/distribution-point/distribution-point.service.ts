import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributionPointService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  getDistributionPoint():Observable<any[]> {
    const url = this.apiUrl.toString() + "DistributionPoint";
    return this.http.get<any[]>(url);
  }

  addOrUpdateDistributionPoint(newDistributionPoint: any): Observable<any> {
    const url = this.apiUrl.toString() + "DistributionPoint";
    return this.http.post(
      url,
      JSON.stringify(newDistributionPoint),
      {
        headers: this.headers
      }
    )
  }

  delete(id: string): any {
    const url = this.apiUrl.toString() + "DistributionPoint/" + id;
    return this.http.delete(
      url,
      {
        headers: this.headers,
      }
    )
  }
}
