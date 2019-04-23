import { Component, OnInit } from '@angular/core';
import { CustomerOrderDetailService, CustomerOrderService, DistributionPointService } from 'app/_services';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { decodeToken } from 'app/_helpers';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  currentUser: any;
  cartForm: FormGroup;
  cart: any;
  commandTotal: number;
  public distributionPoints: any[];
  distributionPointForm: FormGroup;

  constructor(
    private distributionPointService: DistributionPointService,
    private customerOrderDetailService: CustomerOrderDetailService,
    private customerOrderService: CustomerOrderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.cartForm = this.formBuilder.group({
      orderDetail: this.formBuilder.array([this.addOrderDetailFormGroup('', '', '', '', '', '', '', '', '')])
    });

    this.distributionPointForm = this.formBuilder.group({
      distributionPoint: ['', Validators.required,],
    });

    if (this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
      this.loadCartOfCustomer(this.currentUser.id);
      this.loadDistributionPoint();
    }
  }

  get distributionPoint() { return this.distributionPointForm.get('distributionPoint'); }

  addOrderDetailFormGroup(id, idTree, idCustomerOrder, name, zone, ageHeight, price, quantity, totalPrice): FormGroup {
    return this.formBuilder.group({
      id: [id, ,],
      idTree: [idTree, ,],
      idCustomerOrder: [idCustomerOrder, ,],
      name: [name, ,],
      zone: [zone, ,],
      ageHeight: [ageHeight, ,],
      price: [price, ,],
      quantity: [quantity, ,],
      totalPrice: [totalPrice, ,],
    });
  }

  loadCartOfCustomer(id: string) {
    this.customerOrderService.getCustomerCart(id).subscribe(customerOrder => {
      (<FormArray>this.cartForm.get('orderDetail')).removeAt(0);
      if (customerOrder) {
        this.cart = customerOrder.orderDetails;
        this.cartForm = this.formBuilder.group({
          orderDetail: this.formBuilder.array([this.addOrderDetailFormGroup('', '', '', '', '', '', '', '', '')])
        });
        this.commandTotal = 0;
        (<FormArray>this.cartForm.get('orderDetail')).removeAt(0);
        this.cart.forEach(orderDetail => {
          let detailprice = (orderDetail.quantity * orderDetail.tree.price);
          (<FormArray>this.cartForm.get('orderDetail')).push(this.addOrderDetailFormGroup(orderDetail.id, orderDetail.idTree, orderDetail.idCustomerOrder, orderDetail.tree.name, orderDetail.tree.zone, orderDetail.tree.ageHeight, orderDetail.tree.price, orderDetail.quantity, (orderDetail.quantity * orderDetail.tree.price).toFixed(2)));
          this.commandTotal += detailprice;
        });
        this.commandTotal = Number.parseFloat(this.commandTotal.toFixed(2));
      }
    });
  }

  loadDistributionPoint() {
    this.distributionPointService.getDistributionPoint().subscribe(
      distributionPoints => {
        this.distributionPoints = distributionPoints;
      });
  }

  paid() {
    this.customerOrderService.commandObjectInsideCart(
      (<FormArray>this.cartForm.get('orderDetail')).controls[0].get('idCustomerOrder').value,
      this.distributionPoint.value)
      .subscribe();
  }

}
