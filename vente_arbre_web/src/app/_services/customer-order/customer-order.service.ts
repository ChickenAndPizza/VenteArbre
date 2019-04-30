import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService extends MainService {
  constructor(injector: Injector) {
    super(injector);
  }

  getCustomerCart(id: string): Observable<any> {
    let url = this.apiUrl.toString() + "CustomerOrder/" + id;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(url);
  }

  createCustomerCart(id: string): Observable<any> {
    let url = this.apiUrl.toString() + "CustomerOrder/CreateCart/" + id;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(url);
  }

  commandObjectInsideCart(id: string, idDistributionPoint): Observable<any> {
    let url = this.apiUrl.toString() + "CustomerOrder/Command/" + id + "/" + idDistributionPoint;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(url);
  }

  getTotalOrdersInProgress(): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetTotalOrdersInProgress";
    return this.http.get<any>(url);
  }

  get72hOrdersInProgress(): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/Get72hOrdersInProgress";
    return this.http.get<any>(url);
  }

  getTotalOrdersProcessed(): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetTotalOrdersProcessed";
    return this.http.get<any>(url);
  }

  getOrders(order: string): Observable<any[]> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetOrders?order=" + order;
    return this.http.get<any[]>(url);
  }

  getTotalByCategory(): Observable<any[]> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetTotalByCategory";
    return this.http.get<any[]>(url);
  }

  getTotalByDistributionPoint(): Observable<any[]> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetTotalByDistributionPoint";
    return this.http.get<any[]>(url);
  }

  getTotalByAll(): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetTotalByAll";
    return this.http.get<any>(url);
  }

  setOrdersInProgressInProcess(idSupplierOrder: string): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/SetOrdersInProgressInProcess?idSupplierOrder=" + idSupplierOrder;
    return this.http.get<any>(url);
  }

  setOrdersInProcessProcessed(): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/SetOrdersInProcessProcessed";
    return this.http.get<any>(url);
  }

  setProcessedOrdersToShipped(ordersShipped: string[]): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/SetProcessedOrdersToShipped";
    return this.http.post(
      url,
      JSON.stringify(ordersShipped),
      {
        headers: this.headers
      }
    )
  };

  getTotalOrdersForCustomer(customerId: string): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetTotalOrdersForCustomer?customerId=" + customerId;
    return this.http.get<any>(url);
  }

  cancelProcessOfOrders(): Observable<any> {
    const url = this.apiUrl.toString() + "CustomerOrder/CancelProcessOfOrders";
    return this.http.get<any>(url);
  }

  getPreviousCustomerOrders(id: string):Observable<any[]> {
    const url = this.apiUrl.toString() + "CustomerOrder/GetPreviousCustomerOrders";
      return this.http.get<any[]>(url);
}

}