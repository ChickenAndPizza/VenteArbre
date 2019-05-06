import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CustomerOrderService } from 'app/_services';

@Component({
  selector: 'app-orders-shipped',
  templateUrl: './orders-shipped.component.html',
  styleUrls: ['./orders-shipped.component.scss']
})
export class OrdersShippedComponent implements OnInit {

  distributionPointsWithCustomerOrders: any[];
  ordersShipped: string[] = [];

  canContinue: boolean = false;

  constructor(
    private customerOrderService: CustomerOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.canContinue = this.route.snapshot.queryParams['canContinue'] || false;
    this.loadOrdersProcessed();
  }

  loadOrdersProcessed() {
    this.customerOrderService.getOrders("Processed").subscribe(orders => {
      this.distributionPointsWithCustomerOrders = orders;

      for (let distributionPoint of this.distributionPointsWithCustomerOrders) {
        for (let order of distributionPoint.customerOrders) {
          this.ordersShipped.push(order.id);
        }
      }
    }
    );
  }

  updateShippedList(id: string) {
    let checked = $('#' + id).prop('checked');
    if (checked) {
      this.ordersShipped.push(id);
    }
    else {
      const index = this.ordersShipped.indexOf(id, 0);
      if (index > -1) {
        this.ordersShipped.splice(index, 1);
      }
    }
  }

  quit() {
    this.customerOrderService.setProcessedOrdersToShipped(this.ordersShipped).subscribe(c => {
      this.router.navigate(['/orders-processed']);
    });
  }

  goBack() {
    this.router.navigate(['/orders-processed']);
  }

  continue() {
    this.canContinue = true;
    this.router.navigate(['/orders-shipped'], { queryParams: { canContinue: true } });
  }
}
