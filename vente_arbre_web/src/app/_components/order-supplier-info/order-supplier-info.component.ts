import { ActivatedRoute, Router } from '@angular/router';
import { SupplierOrderService } from 'app/_services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-supplier-info',
  templateUrl: './order-supplier-info.component.html',
  styleUrls: ['./order-supplier-info.component.scss']
})
export class OrderSupplierInfoComponent implements OnInit {

  totalByCategory: any[];
  totalByDistributionPoint: any[];
  totalByAll: any;

  constructor(
    private supplierOrderService: SupplierOrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let idSupplierOrder = this.route.snapshot.queryParams['id'] || "";

    this.LoadTotalByCategory(idSupplierOrder);
    this.LoadTotalByDistributionPoint(idSupplierOrder);
    this.LoadTotalByAll(idSupplierOrder);

  }

  LoadTotalByCategory(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByCategory(idSupplierOrder).subscribe(
      total => {
        this.totalByCategory = total;
        console.log(this.totalByCategory);
      });
  }

  LoadTotalByDistributionPoint(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByDistributionPoint(idSupplierOrder).subscribe(
      total => {
        this.totalByDistributionPoint = total;
      });
  }

  LoadTotalByAll(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByAll(idSupplierOrder).subscribe(
      total => {
        this.totalByAll = total;
      });
  }

}
