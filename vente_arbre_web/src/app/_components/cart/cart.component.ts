import { Component, OnInit } from '@angular/core';
import { decodeToken } from 'app/_helpers';
import { CustomerOrderService } from 'app/_services';
import { CustomerOrder } from 'app/_models/customer-order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  currentUser: any;
  cart: any;

  constructor(
    private customerOrderService: CustomerOrderService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);

      this.loadCartOfCustomer(this.currentUser.id);
    }


  }

  loadCartOfCustomer(id: string) {
    this.customerOrderService.getCustomerCart(id).subscribe(customerOrder =>{
      this.cart = customerOrder.orderDetails;
      console.log(this.cart);
    });
  }

}
