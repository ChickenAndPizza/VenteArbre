import { Component, OnInit } from '@angular/core';
import { decodeToken } from 'app/_helpers';
import { CustomerOrderService, CustomerOrderDetailService } from 'app/_services';
import { CustomerOrder } from 'app/_models/customer-order';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from 'app/_directives';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  currentUser: any;
  cart: any;
  cartForm: FormGroup;
  dialogRef: MatDialogRef<DialogComponent>;

  constructor(
    private customerOrderDetailService: CustomerOrderDetailService,
    private customerOrderService: CustomerOrderService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
      this.cartForm = this.formBuilder.group({
        orderDetail: this.formBuilder.array([this.addOrderDetailFormGroup('','','','','','','',)])
      });
      this.loadCartOfCustomer(this.currentUser.id);
    }
  }

  addOrderDetailFormGroup(id, name, zone, ageHeight, price, quantity, totalPrice): FormGroup {
    return this.formBuilder.group({
      id: [id, ,],
      name: [name, ,],
      zone: [zone, ,],
      ageHeight: [ageHeight, ,],
      price: [price, ,],
      quantity: [quantity, ,],
      totalPrice: [totalPrice, ,],
    });
  }

  loadCartOfCustomer(id: string) {
    this.customerOrderService.getCustomerCart(id).subscribe(customerOrder =>{
      this.cart = customerOrder.orderDetails;
      if(this.cart){
        (<FormArray>this.cartForm.get('orderDetail')).removeAt(0);
      }
      this.cart.forEach(orderDetail => {
        (<FormArray>this.cartForm.get('orderDetail')).push(this.addOrderDetailFormGroup(orderDetail.id,orderDetail.tree.name,orderDetail.tree.zone, orderDetail.tree.ageHeight,orderDetail.tree.price,orderDetail.quantity,orderDetail.quantity*orderDetail.tree.price));
      });
      console.log(this.cartForm);
    });
  }

  deleteItem(id: string, i: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Voulez-vous vraiment cet article de votre panier?'
    };
    this.dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) { // if true
        if (this.customerOrderDetailService) {
          this.customerOrderDetailService.deleteDetail(id).subscribe(c => {
            (<FormArray>this.cartForm.get('orderDetail')).reset();
            this.loadCartOfCustomer(this.currentUser.id);
          });
        }
      }
    });
  }

  saveChange() {
    (<FormArray>this.cartForm.get('orderDetail')).controls.forEach(orderDetail => {
      if(orderDetail.dirty) {
        //let detail = {'idTree': orderDetail.id, 'quantity': treeToAdd, 'idCustomerOrder': order.id, 'id':, 'IsActive':true};
        //this.customerOrderDetailService.addOrUpdateCustomerOrderDetail()
      }
      console.log(orderDetail.dirty);
    });
  }

}
