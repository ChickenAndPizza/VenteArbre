import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'app/_services';

@Component({
  selector: 'app-orders-in-progress',
  templateUrl: './orders-in-progress.component.html',
  styleUrls: ['./orders-in-progress.component.scss']
})
export class OrdersInProgressComponent implements OnInit {

  hasOrders = false;
  customerOrders: any[];

  constructor(
    private customerOrderService: CustomerOrderService,
  ) { }

  ngOnInit() {
    this.loadOrdersInProgress();
  }

  private loadOrdersInProgress() {
    this.customerOrderService.getOrdersInProgress().subscribe(
      orders => {
        this.customerOrders = orders;
        if (orders[0])
          this.hasOrders = true;
      }
    );
  }

}
