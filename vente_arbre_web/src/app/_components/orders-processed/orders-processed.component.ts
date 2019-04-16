import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'app/_services';

@Component({
  selector: 'app-orders-processed',
  templateUrl: './orders-processed.component.html',
  styleUrls: ['./orders-processed.component.scss']
})
export class OrdersProcessedComponent implements OnInit {

  hasOrders = false;
  customerOrders: any[];

  constructor(
    private customerOrderService: CustomerOrderService,
  ) { }

  ngOnInit() {
    this.loadOrdersProcessed();
  }

  private loadOrdersProcessed() {
    this.customerOrderService.getOrdersProcessed().subscribe(
      orders => {
        this.customerOrders = orders;
        if (orders[0])
          this.hasOrders = true;
      }
    );
  }

}
