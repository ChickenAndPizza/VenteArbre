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

  constructor(
    private supplierOrderService: SupplierOrderService,
    private customerOrderService: CustomerOrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadOrdersSupplier();
    this.loadOrdersProcessed();
  }

  loadOrdersSupplier() {
    this.supplierOrderService.getPreviousSupplierOrders().subscribe(
      orders => {
        this.supplierOrders = orders;
      }
    );
  }

  loadOrdersProcessed() {
    this.customerOrderService.getOrdersProcessed().subscribe(
      orders => {
        this.customerOrders = orders;
      }
    );
  }

}
