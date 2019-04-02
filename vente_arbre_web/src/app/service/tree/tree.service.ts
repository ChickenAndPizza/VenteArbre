import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreeService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  validateTreeOfCategory(description: string) {
    let url = this.apiUrl.toString() + "Tree/Description?description=" + description;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<boolean[]>(url);
}

  addOrUpdateTree(newTree: any): Observable<any> {
    const url = this.apiUrl.toString() + "Tree";
    return this.http.post(
      url,
      JSON.stringify(newTree),
      {
        headers: this.headers
      }
    )
  };

  delete(id: string) {
    const url = this.apiUrl.toString() + "Tree/" + id;
    return this.http.delete(
      url,
      {
        headers: this.headers,
      }
    )
  }
}
