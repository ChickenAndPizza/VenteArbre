import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'app/_services';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss']
})
export class OrdersSummaryComponent implements OnInit {

  hasValues: boolean = false;
  totalByCategory: any[];

  constructor(
    private customerOrderService : CustomerOrderService
  ) { }

  ngOnInit() {

    this.loadTotalByCategory();
  }
  loadTotalByCategory(): any {
    this.customerOrderService.getTotalByCategory().subscribe(
      total => {
        this.totalByCategory = total;
        if (total[0])
          this.hasValues = true;
      }
    );
  }

}
