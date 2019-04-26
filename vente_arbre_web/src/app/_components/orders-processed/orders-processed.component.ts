import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-processed',
  templateUrl: './orders-processed.component.html',
  styleUrls: ['./orders-processed.component.scss']
})
export class OrdersProcessedComponent implements OnInit {

  hasOrders = false;
  distributionPointsWithCustomerOrders: any[];
  totalOrdersProcessed: any;
  showOptions: boolean = false;

  constructor(
    private customerOrderService: CustomerOrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTotalOrdersProcessed();
    this.loadOrdersProcessed();
  }

  openPreviousOrders() {
    this.router.navigate(['/previous-orders-supplier']);
  }

  shippingOfProcessedOrders() {
    this.router.navigate(['/orders-shipped']);
  }

  loadTotalOrdersProcessed(): any {
    this.customerOrderService.getTotalOrdersProcessed().subscribe(
      total => {
        this.totalOrdersProcessed = total;
        if (total)
          this.hasOrders = true;
      }
    );
  }

  loadOrdersProcessed() {
    this.customerOrderService.getOrders("Processed").subscribe(
      orders => {
        this.distributionPointsWithCustomerOrders = orders;
        if (orders[0])
          this.hasOrders = true;
      }
    );
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-content').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            .OrderDetailPrint {margin-top: -30px; margin-bottom: -30px;}
            .OrderPrint {margin-top: -40px; margin-bottom: -40px;}
            .TitlePrint {margin-bottom: 100px;}
          </style>
          <title>Liste des commandes à terme</title>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
