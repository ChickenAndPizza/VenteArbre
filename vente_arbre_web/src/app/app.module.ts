import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routing } from './app.routing';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgModule, forwardRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';


import { AlertComponent, DialogComponent, DialogAdministratorComponent, DialogEntryComponent, DialogDistributionPointComponent, DialogSupplierComponent, DialogDashboardDescriptionComponent } from './_directives';
import { AlertService, AuthenticationService, UserService, CustomerService, CustomerOrderDetailService } from './_services';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './_components/navigation';
import { AuthGuard } from './_guards';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    SlideshowModule,
    AgmCoreModule.forRoot({
      apiKey: '&lon=-95.511747&lat=29.735577&format=xml'
    }),
    forwardRef(() => routing)

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AlertComponent,
    DialogComponent,
    DialogAdministratorComponent,
    DialogDashboardDescriptionComponent,
    DialogEntryComponent,
    DialogDistributionPointComponent,
    DialogSupplierComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    CustomerService,
    CustomerOrderDetailService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    DialogComponent,
    DialogAdministratorComponent,
    DialogDashboardDescriptionComponent,
    DialogEntryComponent, 
    DialogDistributionPointComponent,
    DialogSupplierComponent,
  ],
})

export class AppModule { }
