import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ConnectionComponent } from '../../connection/connection.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { DistributionPointsComponent } from '../../distribution-points/distribution-points.component';
import { AboutUsComponent } from '../../about-us/about-us.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AuthGuard } from 'app/_guards';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, 
    {
        path: '',
        children: [{
            path: 'user-profile',
            component: UserProfileComponent,
            canActivate : [AuthGuard]
        }]
    },
    //, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    //{ path: 'user-profile', component: UserProfileComponent },
    { path: 'connection', component: ConnectionComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'distribution-points', component: DistributionPointsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
];
