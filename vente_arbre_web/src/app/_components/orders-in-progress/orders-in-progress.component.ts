import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-in-progress',
  templateUrl: './orders-in-progress.component.html',
  styleUrls: ['./orders-in-progress.component.scss']
})
export class OrdersInProgressComponent implements OnInit {

  hasOrders = false;
  distributionPointsWithCustomerOrders: any[];
  totalOrdersInProgress: any;
  total72hOrdersInProgress: any;

  constructor(
    private customerOrderService: CustomerOrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTotalOrdersInProgress();
    this.load72hOrdersInProgress();
    this.loadOrdersInProgress();
  }

  passOrderToSupplier(){
    this.router.navigate(['/orders-summary'], { queryParams: { returnUrl: "orders-in-progress", orderInProcess: true }});
  }

  loadOrdersInProgress() {
    this.customerOrderService.getOrders("Paid").subscribe(
      orders => {
        this.distributionPointsWithCustomerOrders = orders;
        if (orders[0])
          this.hasOrders = true;
        console.log(this.distributionPointsWithCustomerOrders);
      }
    );
  }

  loadTotalOrdersInProgress(): any {
    this.customerOrderService.getTotalOrdersInProgress().subscribe(
      total => {
        this.totalOrdersInProgress = total;
        if (total)
          this.hasOrders = true;
      }
    );
  }

  load72hOrdersInProgress(): any {
    this.customerOrderService.get72hOrdersInProgress().subscribe(
      total => {
        this.total72hOrdersInProgress = total;
        if (total)
          this.hasOrders = true;
      }
    );
  }
}
