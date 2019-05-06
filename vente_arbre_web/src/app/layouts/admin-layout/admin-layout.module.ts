import { MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { SlideshowModule } from 'ng-simple-slideshow';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent, UserProfileComponent, ConnectionComponent, TreeListComponent, TreeInfoComponent, TreeAddComponent, DistributionPointsComponent, AboutUsComponent, CartComponent, OrdersInProgressComponent, OrdersSummaryComponent, OrdersProcessedComponent, OrdersShippedComponent, PreviousOrdersSupplierComponent, OrderComponent, OrderSupplierInfoComponent, ManagementComponent, PreviousOrdersCustomerComponent, OrderCustomerInfoComponent, OrderSupplierInfoCustomersComponent } from 'app/_components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SlideshowModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CartComponent,
    OrderComponent,
    ConnectionComponent,
    TreeListComponent,
    TreeInfoComponent,
    TreeAddComponent,
    DistributionPointsComponent,
    AboutUsComponent,
    OrderCustomerInfoComponent,
    OrderSupplierInfoComponent,
    OrderSupplierInfoCustomersComponent,
    OrdersInProgressComponent,
    OrdersSummaryComponent,
    OrdersProcessedComponent,
    OrdersShippedComponent,
    PreviousOrdersCustomerComponent,
    PreviousOrdersSupplierComponent,
    ManagementComponent
  ]
})

export class AdminLayoutModule {}
