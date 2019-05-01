import { Component, OnInit } from '@angular/core';
import { CustomerOrderService, SupplierOrderService } from 'app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-orders-supplier',
  templateUrl: './previous-orders-supplier.component.html',
  styleUrls: ['./previous-orders-supplier.component.scss']
})
export class PreviousOrdersSupplierComponent implements OnInit {

  supplierOrders: any[];
  customerOrders: any[];
  hasSupplierOrders = false;

  constructor(
    private supplierOrderService: SupplierOrderService,
    private customerOrderService: CustomerOrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.LoadOrdersSupplier();
    this.LoadOrdersProcessed();
  }

  OpenSupplierOrderSummary(id: string) {
    this.router.navigate(['/order-supplier-info'], { queryParams: { id: id } });
  }

  LoadOrdersSupplier() {
    this.supplierOrderService.getPreviousSupplierOrders().subscribe(
      orders => {
        this.supplierOrders = orders;

        if (orders[0])
          this.hasSupplierOrders = true;

        for (let cpt = 0; cpt < this.supplierOrders.length; cpt++) {
          let date = this.supplierOrders[cpt].transactionDate.toString();
          let bindex = date.indexOf("T");
          let eindex = date.length;
          date = date.replace(date.substring(bindex, eindex), "");
          this.supplierOrders[cpt].transactionDate = date;
        }
      }
    );
  }

  LoadOrdersProcessed() {
    this.customerOrderService.getOrders("Processed").subscribe(
      orders => {
        this.customerOrders = orders;
      }
    );
  }

}
