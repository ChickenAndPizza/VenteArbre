import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SupplierOrderService } from 'app/_services';

@Component({
  selector: 'app-order-supplier-info',
  templateUrl: './order-supplier-info.component.html',
  styleUrls: ['./order-supplier-info.component.scss']
})
export class OrderSupplierInfoComponent implements OnInit {

  public totalByCategory: any[];
  public totalByDistributionPoint: any[];
  public totalByAll: any;

  public idSupplierOrder: any;

  constructor(
    private supplierOrderService: SupplierOrderService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.idSupplierOrder = this.route.snapshot.queryParams['id'] || "";

    this.loadTotalByCategory(this.idSupplierOrder);
    this.loadTotalByDistributionPoint(this.idSupplierOrder);
    this.loadTotalByAll(this.idSupplierOrder);
  }

  public viewCustomerOrdersOfSupplierOrder() {
    this.router.navigate(['/order-supplier-info-customers'], { queryParams: { supplierOrderId: this.idSupplierOrder } });
  }

  private loadTotalByCategory(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByCategory(idSupplierOrder).subscribe(
      total => {
        this.totalByCategory = total;
      });
  }

  private loadTotalByDistributionPoint(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByDistributionPoint(idSupplierOrder).subscribe(
      total => {
        this.totalByDistributionPoint = total;
      });
  }

  private loadTotalByAll(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByAll(idSupplierOrder).subscribe(
      total => {
        this.totalByAll = total;
      });
  }

}
