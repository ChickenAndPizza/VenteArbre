import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerOrderDetailService, CustomerOrderService, DistributionPointService, TreeService, ChargeService } from 'app/_services';
import { decodeToken, getPhoneNumber } from 'app/_helpers';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  currentUser: any;
  phoneNumber: String;

  cartForm: FormGroup;
  cart: any;

  handler: any;

  withoutTax: number;
  tps: number;
  tvq: number;
  orderTotal: number;

  distributionPoints: any[];
  distributionPointForm: FormGroup;
  quantityError = [];

  hasPaid = false;
  canPaid = false;

  constructor(
    private distributionPointService: DistributionPointService,
    private customerOrderService: CustomerOrderService,
    private chargeService: ChargeService,
    private treeService: TreeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_8RTILcXiDFISt1SHtKEy2Fyq00Rr9UXWma',
      image: '/assets/img/cer/mini_logo_CER_tr.png',
      locale: 'auto',
      currency: 'cad',
      token: token => {
        this.chargeService.charge(token, (this.orderTotal * 100)).subscribe(
          c => {
            if(c && this.canPaid) {
              this.hasPaid = true;
              this.commandObject();
            }
          }
        );   
       }
    });

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.cartForm = this.formBuilder.group({
      orderDetail: this.formBuilder.array([this.addOrderDetailFormGroup('', '', '', '', '', '', '', '', '')])
    });

    this.distributionPointForm = this.formBuilder.group({
      distributionPoint: ['', Validators.required,],
    });

    if (this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
      this.phoneNumber = getPhoneNumber(this.currentUser.phoneNumber);
      this.loadCartOfCustomer(this.currentUser.id);
      this.loadDistributionPoint();
    }
  }


  async checkout(e) {
    await this.checkIfCanPaid();
    this.handler.open({
      name: 'Comité enviro. responsable',
      amount: (this.orderTotal * 100),
      email: this.currentUser.email,
      allowRememberMe: false,
    });
    e.preventDefault();
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

  get distributionPoint() { return this.distributionPointForm.get('distributionPoint'); }
  get cartData() { return <FormArray>this.cartForm.get('orderDetail'); }

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
        this.withoutTax = 0;
        (<FormArray>this.cartForm.get('orderDetail')).removeAt(0);
        this.cart.forEach(orderDetail => {
          let detailprice = (orderDetail.quantity * orderDetail.tree.price);
          (<FormArray>this.cartForm.get('orderDetail')).push(this.addOrderDetailFormGroup(orderDetail.id, orderDetail.idTree, orderDetail.idCustomerOrder, orderDetail.tree.name, orderDetail.tree.zone, orderDetail.tree.ageHeight, orderDetail.tree.price, orderDetail.quantity, (orderDetail.quantity * orderDetail.tree.price).toFixed(2)));
          this.withoutTax += detailprice;
        });
        this.withoutTax = Number.parseFloat(this.withoutTax.toFixed(2));
        this.tps = Number.parseFloat((this.withoutTax*0.05).toFixed(2));
        this.tvq = Number.parseFloat((this.withoutTax*0.09975).toFixed(2));
        this.orderTotal = Number.parseFloat((this.withoutTax + this.tps + this.tvq).toFixed(2));
      }
    });
  }

  loadDistributionPoint() {
    this.distributionPointService.getDistributionPoint().subscribe(
      distributionPoints => {
        this.distributionPoints = distributionPoints;
      });
  }

  checkIfCanPaid() {
    let formLength = (<FormArray>this.cartForm.get('orderDetail')).controls.length;
    let index = 1;
    this.quantityError = [];
    (<FormArray>this.cartForm.get('orderDetail')).controls.forEach(orderDetail => {
      this.treeService.validateCustomerOrderDetailTree(
        orderDetail.get('idTree').value,
        orderDetail.get('quantity').value).subscribe(canAdd => {
          if (!canAdd) {
            orderDetail.get('quantity').setErrors({ 'notEnough': true });
            this.treeService.getRemainingQuantity(orderDetail.get('idTree').value).subscribe(c => {
              orderDetail.updateValueAndValidity();
              if (c == 0) {
                this.quantityError.push("Rupture de stock pour " + orderDetail.get('name').value);
              } else {
                this.quantityError.push("Il reste seulement " + c + " " + orderDetail.get('name').value + " en stock.");
              }
            });
          } else if (index === formLength) {
            if (this.quantityError.length < 1) {
              this.canPaid = true;
            } else {
              this.canPaid = false;
            }
          }
          index++;
        });
    });
  }

  commandObject() {
    this.customerOrderService.orderObjectInsideCart(
      (<FormArray>this.cartForm.get('orderDetail')).controls[0].get('idCustomerOrder').value,
      this.distributionPoint.value)
      .subscribe();
  }

  public captureScreen()  
  {  
    var data = document.getElementById('print-section'); 
    data.getElementsByClassName('btn-print')[0]
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Facture.pdf'); // Generated PDF   
    });  
  }

}
