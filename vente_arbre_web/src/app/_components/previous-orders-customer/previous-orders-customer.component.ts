import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerOrderService } from 'app/_services';
import { decodeToken } from 'app/_helpers';

@Component({
  selector: 'app-previous-orders-customer',
  templateUrl: './previous-orders-customer.component.html',
  styleUrls: ['./previous-orders-customer.component.scss']
})
export class PreviousOrdersCustomerComponent implements OnInit {

  currentUser: any;
  customerOrders: any[];
  hasCustomerOrders: boolean = false;

  constructor(
    private customerOrderService: CustomerOrderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
      this.loadOrdersCustomer(this.currentUser.id);
    }
  }

  openCustomerOrderSummary(customerOrderId: string) {
    this.router.navigate(['/order-customer-info'], { queryParams: { customerOrderId: customerOrderId } });
  }

  loadOrdersCustomer(customerId: string) {
    this.customerOrderService.getPreviousCustomerOrders(customerId).subscribe(
      orders => {
        this.customerOrders = orders;

        if (orders[0])
          this.hasCustomerOrders = true;

        for (let cpt = 0; cpt < this.customerOrders.length; cpt++) {
          let date = this.customerOrders[cpt].transactionDate.toString();
          let bindex = date.indexOf("T");
          let eindex = date.length;
          date = date.replace(date.substring(bindex, eindex), "");
          this.customerOrders[cpt].transactionDate = date;
        }
      }
    );
  }

}
