import { DashboardComponent, UserProfileComponent, ConnectionComponent, TreeListComponent, TreeInfoComponent, TreeAddComponent, DistributionPointsComponent, AboutUsComponent, TypographyComponent, IconsComponent, NotificationsComponent } from 'app/_components';
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
    ConnectionComponent,
    TreeListComponent,
    TreeInfoComponent,
    TreeAddComponent,
    DistributionPointsComponent,
    AboutUsComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
