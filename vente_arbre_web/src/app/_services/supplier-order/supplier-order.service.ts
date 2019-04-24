import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SupplierOrderService extends MainService {
    constructor(injector: Injector) {
        super(injector);
    }

    createSupplierOrder(idCustomer: string, idSupplier: string) {
        let url = this.apiUrl.toString() + "SupplierOrder/CreateSupplierOrder?idCustomer=" + idCustomer + "&idSupplier=" + idSupplier;

        let headers = new HttpHeaders();
        headers = headers.set('Access-Control-Allow-Origin', '*');
        return this.http.get<any>(url);
    }

    getPreviousSupplierOrders():Observable<any[]> {
        const url = this.apiUrl.toString() + "SupplierOrder/GetPreviousSupplierOrders";
          return this.http.get<any[]>(url);
    }
}