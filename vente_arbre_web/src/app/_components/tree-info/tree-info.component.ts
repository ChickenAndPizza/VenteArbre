import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeCategoryService, TreeService, CustomerOrderDetailService, CustomerOrderService } from 'app/_services';
import { ActivatedRoute } from '@angular/router';
import { decodeToken } from 'app/_helpers';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-tree-info',
  templateUrl: './tree-info.component.html',
  styleUrls: ['./tree-info.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
  ]
})
export class TreeInfoComponent implements OnInit {

  currentUser: any;
  quantityInfo: FormGroup;
  treeInfo: FormGroup;
  treeId: string;
  categoryId: string;
  categoryDescr: string;
  save = false;

  constructor(
    private customerOrderService: CustomerOrderService,
    private customerOrderDetailService: CustomerOrderDetailService,
    private treeCategoryService: TreeCategoryService,
    private treeService: TreeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.treeId = this.route.snapshot.queryParams['id'] || "";
    this.categoryId = this.route.snapshot.queryParams['categ'] || "";
    this.categoryDescr = this.route.snapshot.queryParams['descr'] || "";
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
    }


    this.treeInfo = this.formBuilder.group({
      name: ["", , ],
      zone: [{value: "", disabled: true}, ,],
      price: [{value: "", disabled: true}, ,],
      ageHeight: [{value: "", disabled: true}, ,],
      description: [{value: "", disabled: true}, ,],
      image: [null, ,],
      idTreeCategory: [this.categoryId, ,]
    });

    this.quantityInfo = this.formBuilder.group({
      quantity: ['', [Validators.required,Validators.min(1)]]
    });

    this.treeService.getTree(this.treeId).subscribe(tree => {
        this.name.setValue(tree.name);
        this.zone.setValue(tree.zone);
        this.price.setValue(tree.price);
        this.ageHeight.setValue(tree.ageHeight);
        this.description.setValue(tree.description);
        this.image.setValue(tree.image);
    });
  }

  get name() { return this.treeInfo.get('name'); }
  get zone() { return this.treeInfo.get('zone'); }
  get price() { return this.treeInfo.get('price'); }
  get ageHeight() { return this.treeInfo.get('ageHeight'); }
  get description() { return this.treeInfo.get('description'); }
  get image() { return this.treeInfo.get('image'); }

  get quantity() { return this.quantityInfo.get('quantity'); }

  addToCart(qtyToAdd: number) {
    this.save = true;
    this.customerOrderService.getCustomerCart(this.currentUser.id).subscribe(order => {
      if(order !== null) {
        let orderDetail = {'idTree': this.treeId, 'quantity': qtyToAdd, 'idCustomerOrder': order.id};
        this.customerOrderDetailService.addOrUpdateCustomerOrderDetail(orderDetail).subscribe();
      } else {
        this.customerOrderService.createCustomerCart(this.currentUser.id).subscribe(cart => {
          let orderDetail = {'idTree': this.treeId, 'quantity': qtyToAdd, 'idCustomerOrder': cart.id};
          this.customerOrderDetailService.addOrUpdateCustomerOrderDetail(orderDetail).subscribe();
        });
      }
      setTimeout( () => {
        this.save = false;
    }, 3000);
      this.quantity.setValue(0);
      this.quantityInfo.markAsUntouched();
    });
  }

  canAddToCart() {
    if(this.currentUser && this.quantityInfo.valid) {
      return false;
    } else {
      return true;
    }
  }
}
