import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
  {
    path: '', component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  //{ path: 'user-profile', component: UserProfileComponent, canActivate : [AuthGuard] },
  // { path: 'dashboard',      component: DashboardComponent },
  // { path: 'user-profile',   component: UserProfileComponent },
  // { path: 'connection',     component: ConnectionComponent },
  // { path: 'table-list',     component: TableListComponent },
  // { path: 'distribution-points', component: DistributionPointsComponent },
  // { path: 'typography',     component: TypographyComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
