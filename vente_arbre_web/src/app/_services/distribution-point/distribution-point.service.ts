import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main/main.service';
import { HttpHeaders } from '@angular/common/http';

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

  validatePoint(id: string, webName: any): any {
    let url = '';
    if(id){
      url = this.apiUrl.toString() + "DistributionPoint/WebName?id="+ id + "&webName=" + webName;
    } else {
      url = this.apiUrl.toString() + "DistributionPoint/WebName?webName=" + webName;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<boolean[]>(url);
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
