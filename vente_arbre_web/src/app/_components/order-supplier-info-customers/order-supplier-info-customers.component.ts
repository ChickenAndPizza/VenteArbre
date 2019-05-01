import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'app/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-supplier-info-customers',
  templateUrl: './order-supplier-info-customers.component.html',
  styleUrls: ['./order-supplier-info-customers.component.scss']
})
export class OrderSupplierInfoCustomersComponent implements OnInit {

  distributionPointsWithCustomerOrders: any[];
  totalOrdersProcessed: any;

  public supplierOrderId:any;

  constructor(
    private customerOrderService: CustomerOrderService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.supplierOrderId = this.route.snapshot.queryParams['supplierOrderId'] || "";

    this.LoadTotalOrdersOfSupplierOrder(this.supplierOrderId);
    this.LoadOrdersOfSupplierOrder(this.supplierOrderId);
  }

  GoBack(){
    this.router.navigate(['/order-supplier-info'], { queryParams: { id: this.supplierOrderId } });
  }

  LoadTotalOrdersOfSupplierOrder(supplierOrderId: string): any {
    this.customerOrderService.getTotalOrdersOfSupplierOrder(supplierOrderId).subscribe(
      total => {
        this.totalOrdersProcessed = total;
      }
    );
  }

  LoadOrdersOfSupplierOrder(supplierOrderId: string) {
    this.customerOrderService.getOrdersOfSupplierOrder(supplierOrderId).subscribe(
      orders => {
        this.distributionPointsWithCustomerOrders = orders;
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
