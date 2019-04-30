import { Component, OnInit } from '@angular/core';
import { decodeToken } from 'app/_helpers';
import { CustomerOrderService } from 'app/_services';
import { Router } from '@angular/router';

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
      this.LoadOrdersCustomer(this.currentUser.id);
    }
  }

  OpenSupplierOrderSummary(id: string){
    this.router.navigate(['/order-supplier-info'], { queryParams: { id: id }});
  }

  LoadOrdersCustomer(id: string) {
    this.customerOrderService.getPreviousCustomerOrders(id).subscribe(
      orders => {
        this.customerOrders = orders;

        if (orders[0])
          this.hasCustomerOrders = true;
        
        for (let cpt = 0; cpt < this.customerOrders.length; cpt++){
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
