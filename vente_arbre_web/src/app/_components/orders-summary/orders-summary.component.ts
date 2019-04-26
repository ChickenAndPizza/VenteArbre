import { Component, OnInit } from '@angular/core';
import { CustomerOrderService, SupplierOrderService, TreeService } from 'app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { decodeToken } from 'app/_helpers';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss']
})
export class OrdersSummaryComponent implements OnInit {

  currentUser: any;
  returnUrl: any;
  hasValues: boolean = false;
  totalByCategory: any[];
  totalByDistributionPoint: any[];
  totalByAll: any;
  canContinue: boolean = false;

  isOrderInProcess: boolean = false;

  constructor(
    private customerOrderService: CustomerOrderService,
    private supplierOrderService: SupplierOrderService,
    private treeService: TreeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "";
    this.isOrderInProcess = this.route.snapshot.queryParams['orderInProcess'] || false;
    this.canContinue = this.route.snapshot.queryParams['canContinue'] || false;

    this.loadTotalByCategory();
    this.loadTotalByDistributionPoint();
    this.loadTotalByAll();

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.currentUser = decodeToken(this.currentUser);
    }
  }

  GoBack() {
    this.router.navigate([this.returnUrl]);
  }

  Continue() {
    this.canContinue = true;

    this.supplierOrderService.createSupplierOrder(this.currentUser.id, '0de52078-06c1-44d4-8a74-170e01aca1aa').subscribe(idSupplierOrder => {
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

  loadTotalByCategory(): any {
    this.customerOrderService.getTotalByCategory().subscribe(
      total => {
        this.totalByCategory = total;
        if (total[0])
          this.hasValues = true;
      });
  }

  loadTotalByDistributionPoint(): any {
    this.customerOrderService.getTotalByDistributionPoint().subscribe(
      total => {
        this.totalByDistributionPoint = total;
        if (total[0])
          this.hasValues = true;
      });
  }

  loadTotalByAll(): any {
    this.customerOrderService.getTotalByAll().subscribe(
      total => {
        this.totalByAll = total;
        if (total)
          this.hasValues = true;
      });
  }
}
