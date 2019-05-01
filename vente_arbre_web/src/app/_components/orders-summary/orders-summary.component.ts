import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CustomerOrderService, SupplierOrderService, TreeService, SupplierService } from 'app/_services';
import { decodeToken } from 'app/_helpers';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss']
})
export class OrdersSummaryComponent implements OnInit {

  currentUser: any;
  returnUrl: any;

  totalByCategory: any[];
  totalByDistributionPoint: any[];
  totalByAll: any;

  hasValues: boolean = false;
  canContinue: boolean = false;
  isOrderInProcess: boolean = false;

  formSupplier: FormGroup;
  suppliers: any[];

  constructor(
    private customerOrderService: CustomerOrderService,
    private supplierOrderService: SupplierOrderService,
    private supplierService: SupplierService,
    private treeService: TreeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "";
    this.isOrderInProcess = this.route.snapshot.queryParams['orderInProcess'] || false;
    this.canContinue = this.route.snapshot.queryParams['canContinue'] || false;

    if(this.canContinue) { //commandes avec un status de "en cours"
      this.LoadTotalByCategory("InProcess");
      this.LoadTotalByDistributionPoint("InProcess");
      this.LoadTotalByAll("InProcess");
    }
    else { //commandes avec un status de "payé"
      this.LoadTotalByCategory("Paid");
      this.LoadTotalByDistributionPoint("Paid");
      this.LoadTotalByAll("Paid");
    }
    this.LoadSuppliers();
    this.SetCurrentUser();
    
    this.formSupplier = this.formBuilder.group({
      supplier: ["", Validators.required,]
    })
  }

  get supplier() { return this.formSupplier.get('supplier'); }

  GoBack() {
    this.router.navigate([this.returnUrl]);
  } 

  SubmitSupplierOrder() {
    this.canContinue = true;
    this.supplierOrderService.createSupplierOrder(this.currentUser.id, this.formSupplier.get('supplier').value).subscribe(idSupplierOrder => {
      this.customerOrderService.setOrdersInProgressInProcess(idSupplierOrder).subscribe(c => {
        this.treeService.resetTreeMaximumQuantity().subscribe();
        this.router.navigate(['/orders-summary'], { queryParams: { orderInProcess: true, canContinue: true } });
      });
    });
  }

  Quit() {
    this.customerOrderService.setOrdersInProcessProcessed().subscribe(c => {
      this.router.navigate(['/orders-processed']);
    });
  }

  private LoadTotalByCategory(state: string): any {
    this.customerOrderService.getTotalByCategory(state).subscribe(
      total => {
        this.totalByCategory = total;
        if (total[0])
          this.hasValues = true;
      });
  }

  private LoadTotalByDistributionPoint(state: string): any {
    this.customerOrderService.getTotalByDistributionPoint(state).subscribe(
      total => {
        this.totalByDistributionPoint = total;
        if (total[0])
          this.hasValues = true;
      });
  }

  private LoadTotalByAll(state: string): any {
    this.customerOrderService.getTotalByAll(state).subscribe(
      total => {
        this.totalByAll = total;
        if (total)
          this.hasValues = true;
      });
  }

  private LoadSuppliers(): any {
    this.supplierService.getSuppliers().subscribe(
      suppliers => {
        this.suppliers = suppliers;
      });
  }

  private SetCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
    }
  }
}
