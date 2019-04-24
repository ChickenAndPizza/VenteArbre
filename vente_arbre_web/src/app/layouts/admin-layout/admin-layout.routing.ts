import { Routes } from '@angular/router';
import { AuthGuard } from 'app/_guards';
import { DashboardComponent, UserProfileComponent, ConnectionComponent, TreeListComponent, TreeInfoComponent, TreeAddComponent, DistributionPointsComponent, AboutUsComponent, TypographyComponent, IconsComponent, NotificationsComponent, CartComponent, OrdersProcessedComponent, OrdersInProgressComponent, OrdersSummaryComponent, OrdersShippedComponent, PreviousOrdersSupplierComponent, CommandComponent } from 'app/_components';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, 
    // {
    //     path: '',
    //     children: [{
    //         path: 'user-profile',
    //         component: UserProfileComponent,
    //         canActivate : [AuthGuard]
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent, canActivate : [AuthGuard] },
    { path: 'connection', component: ConnectionComponent },
    { path: 'tree-list', component: TreeListComponent },
    { path: 'tree-info', component: TreeInfoComponent },
    { path: 'tree-add', component: TreeAddComponent },
    { path: 'distribution-points', component: DistributionPointsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'orders-processed', component: OrdersProcessedComponent },
    { path: 'orders-in-progress', component: OrdersInProgressComponent },
    { path: 'orders-summary', component: OrdersSummaryComponent },
    { path: 'orders-shipped', component: OrdersShippedComponent },
    { path: 'previous-orders-supplier', component: PreviousOrdersSupplierComponent },
    { path: 'command', component: CommandComponent },
];
