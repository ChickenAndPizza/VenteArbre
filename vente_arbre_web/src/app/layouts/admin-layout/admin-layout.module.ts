import { MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent, UserProfileComponent, ConnectionComponent, TreeListComponent, TreeInfoComponent, TreeAddComponent, DistributionPointsComponent, AboutUsComponent, TypographyComponent, IconsComponent, NotificationsComponent, CartComponent, OrdersInProgressComponent, OrdersSummaryComponent, OrdersProcessedComponent, OrdersShippedComponent, PreviousOrdersSupplierComponent, CommandComponent, OrderSupplierInfoComponent, ManagementComponent, PreviousOrdersCustomerComponent, OrderCustomerInfoComponent } from 'app/_components';

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
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CartComponent,
    CommandComponent,
    ConnectionComponent,
    TreeListComponent,
    TreeInfoComponent,
    TreeAddComponent,
    DistributionPointsComponent,
    AboutUsComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    OrderCustomerInfoComponent,
    OrderSupplierInfoComponent,
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
