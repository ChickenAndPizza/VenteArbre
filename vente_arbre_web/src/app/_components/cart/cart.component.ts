import { Component, OnInit } from '@angular/core';
import { decodeToken } from 'app/_helpers';
import { CustomerOrderService, CustomerOrderDetailService, TreeService } from 'app/_services';
import { CustomerOrder } from 'app/_models/customer-order';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from 'app/_directives';
import { detachProjectedView } from '@angular/core/src/view/view_attach';
import { Router } from '@angular/router';

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
  commandTotal: number;
  quantityError = [];
  constructor(
    private customerOrderDetailService: CustomerOrderDetailService,
    private customerOrderService: CustomerOrderService,
    private treeService: TreeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.cartForm = this.formBuilder.group({
      orderDetail: this.formBuilder.array([this.addOrderDetailFormGroup('', '', '', '', '', '', '', '', '')])
    });
    if (this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
      this.loadCartOfCustomer(this.currentUser.id);
    }
  }

  addOrderDetailFormGroup(id, idTree, idCustomerOrder, name, zone, ageHeight, price, quantity, totalPrice): FormGroup {
    return this.formBuilder.group({
      id: [id, ,],
      idTree: [idTree, ,],
      idCustomerOrder: [idCustomerOrder, ,],
      name: [name, ,],
      zone: [zone, ,],
      ageHeight: [ageHeight, ,],
      price: [price, ,],
      quantity: [quantity, Validators.required,],
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
            this.loadCartOfCustomer(this.currentUser.id);
          });
        }
      }
    });
  }

  saveChange() {
    (<FormArray>this.cartForm.get('orderDetail')).controls.forEach(orderDetail => {
      if (orderDetail.dirty) {
        let detail = { 'id': orderDetail.get('id').value, 'idTree': orderDetail.get('idTree').value, 'IdCustomerOrder': orderDetail.get('idCustomerOrder').value, 'quantity': orderDetail.get('quantity').value, 'IsActive': true };
        this.customerOrderDetailService.addOrUpdateCustomerOrderDetail(detail).subscribe(c => {
          this.loadCartOfCustomer(this.currentUser.id);
        });
      }
    });
  }

  canCommand() {
    if (this.currentUser) {
      return false;
    } else {
      return true;
    }
  }

  command() {
    let formLength = (<FormArray>this.cartForm.get('orderDetail')).controls.length;
    let index = 1;
    this.quantityError = [];
    (<FormArray>this.cartForm.get('orderDetail')).controls.forEach(orderDetail => {
      this.treeService.validateCustomerOrderDetailTree(
        orderDetail.get('idTree').value,
        orderDetail.get('quantity').value).subscribe(canAdd => {
          if (!canAdd) {
            this.treeService.getRemainingQuantity(orderDetail.get('idTree').value).subscribe(c => {
              orderDetail.updateValueAndValidity();
              if(c == 0) {
                this.quantityError.push("Rupture de stock pour " + orderDetail.get('name').value);
              } else {
                this.quantityError.push("Il reste seulement " + c + " " + orderDetail.get('name').value + " en stock.");
              }
            });
          } else if (index === formLength) {
            if (this.quantityError.length < 1) {
              this.router.navigate(['/command']);
            }
          }
          index++;
        });
    });
    this.cartForm.updateValueAndValidity();

  }

  checkIfError(orderDetail: AbstractControl) {

  }

  disableButtonWhenNotConnected() {
    if (this.currentUser) {
      return false;
    } else {
      return true;
    }
  }

  disableButtonWhenNotConnectedAndNoCard() {
    if (this.cartForm.valid && this.currentUser && this.cart && (<FormArray>this.cartForm.get('orderDetail')).length > 0) {
      return false;
    } else {
      return true;
    }
  }

}
