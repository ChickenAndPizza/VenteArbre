import { DashboardComponent, UserProfileComponent, ConnectionComponent, TreeListComponent, TreeInfoComponent, TreeAddComponent, DistributionPointsComponent, AboutUsComponent, TypographyComponent, IconsComponent, NotificationsComponent, CartComponent, OrdersInProgressComponent, OrdersSummaryComponent, OrdersProcessedComponent, OrdersShippedComponent, PreviousOrdersSupplierComponent } from 'app/_components';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
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
    OrdersInProgressComponent,
    OrdersSummaryComponent,
    OrdersProcessedComponent,
    OrdersShippedComponent,
    PreviousOrdersSupplierComponent
  ]
})

export class AdminLayoutModule {}
