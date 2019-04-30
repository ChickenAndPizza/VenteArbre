import { CustomerOrderService } from 'app/_services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-in-progress',
  templateUrl: './orders-in-progress.component.html',
  styleUrls: ['./orders-in-progress.component.scss']
})
export class OrdersInProgressComponent implements OnInit {

  distributionPointsWithCustomerOrders: any[];
  totalOrdersInProgress: any;
  total72hOrdersInProgress: any;

  hasOrders = false;
  hasOrdersInProcess = false;

  constructor(
    
    private customerOrderService: CustomerOrderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.LoadTotalOrdersInProgress();
    this.Load72hOrdersInProgress();
    this.LoadOrdersInProgress();
    this.LoadOrdersInProcess();
  }

  passOrderToSupplier(){
    this.router.navigate(['/orders-summary'], { queryParams: { returnUrl: "orders-in-progress", orderInProcess: true }});
  }

  EndProcessing(){
    this.customerOrderService.cancelProcessOfOrders().subscribe(c => {
      this.hasOrdersInProcess = false;
      this.LoadTotalOrdersInProgress();
      this.Load72hOrdersInProgress();
      this.LoadOrdersInProgress();
    });
  }

  public ContinueProcessing() {
    this.router.navigate(['/orders-summary'], { queryParams: { returnUrl: "orders-in-progress", orderInProcess: true, canContinue: true}});
  }

  private LoadTotalOrdersInProgress(): any {
    this.customerOrderService.getTotalOrdersInProgress().subscribe(
      total => {
        this.totalOrdersInProgress = total;
        if (total)
          this.hasOrders = true;
      }
    );
  }

  private Load72hOrdersInProgress(): any {
    this.customerOrderService.get72hOrdersInProgress().subscribe(
      total => {
        this.total72hOrdersInProgress = total;
        if (total)
          this.hasOrders = true;
      }
    );
  }

  private LoadOrdersInProgress() {
    this.customerOrderService.getOrders("Paid").subscribe(
      orders => {
        this.distributionPointsWithCustomerOrders = orders;
        if (orders[0])
          this.hasOrders = true;
      }
    );
  }

  private LoadOrdersInProcess() {
    this.customerOrderService.getOrders("InProcess").subscribe(
      orders => {
        if (orders[0])
          this.hasOrdersInProcess = true;
      }
    );
  }
}
