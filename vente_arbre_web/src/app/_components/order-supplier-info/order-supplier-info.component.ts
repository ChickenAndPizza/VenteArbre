import { ActivatedRoute, Router } from '@angular/router';
import { SupplierOrderService } from 'app/_services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-supplier-info',
  templateUrl: './order-supplier-info.component.html',
  styleUrls: ['./order-supplier-info.component.scss']
})
export class OrderSupplierInfoComponent implements OnInit {

  public totalByCategory: any[];
  public totalByDistributionPoint: any[];
  public totalByAll: any;

  public idSupplierOrder:any;

  constructor(
    private supplierOrderService: SupplierOrderService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.idSupplierOrder = this.route.snapshot.queryParams['id'] || "";

    this.LoadTotalByCategory(this.idSupplierOrder);
    this.LoadTotalByDistributionPoint(this.idSupplierOrder);
    this.LoadTotalByAll(this.idSupplierOrder);
  }

  public ViewCustomerOrdersOfSupplierOrder(){
    this.router.navigate(['/order-supplier-info-customers'], { queryParams: { supplierOrderId: this.idSupplierOrder }});
  }

  private LoadTotalByCategory(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByCategory(idSupplierOrder).subscribe(
      total => {
        this.totalByCategory = total;
      });
  }

  private LoadTotalByDistributionPoint(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByDistributionPoint(idSupplierOrder).subscribe(
      total => {
        this.totalByDistributionPoint = total;
      });
  }

  private LoadTotalByAll(idSupplierOrder: string): any {
    this.supplierOrderService.getTotalByAll(idSupplierOrder).subscribe(
      total => {
        this.totalByAll = total;
      });
  }

}
