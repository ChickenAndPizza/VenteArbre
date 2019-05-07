import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerOrderService } from 'app/_services';

@Component({
  selector: 'app-order-customer-info',
  templateUrl: './order-customer-info.component.html',
  styleUrls: ['./order-customer-info.component.scss']
})
export class OrderCustomerInfoComponent implements OnInit {

  customerOrder: any = "";

  constructor(
    private customerOrderService: CustomerOrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let customerOrderId = this.route.snapshot.queryParams['customerOrderId'] || "";
    this.LoadCustomerOrder(customerOrderId);
  }

  LoadCustomerOrder(customerOrderId: string): any {
    this.customerOrderService.getCustomerOrder(customerOrderId).subscribe(
      customerOrder => {
        this.customerOrder = customerOrder;
      });
  }

}
