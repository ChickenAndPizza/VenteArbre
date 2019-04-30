import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  getSuppliers(): Observable<any[]> {
    const url = this.apiUrl.toString() + "Supplier/GetSuppliers";
    return this.http.get<any[]>(url);
  }

  addOrUpdateSupplier(supplier: any): Observable<any> {
    const url = this.apiUrl.toString() + "Supplier";
    return this.http.post(
      url,
      JSON.stringify(supplier),
      {
        headers: this.headers
      }
    )
  }

  delete(id: string): any {
    const url = this.apiUrl.toString() + "Supplier/" + id;
    return this.http.delete(
      url,
      {
        headers: this.headers,
      }
    )
  }
}