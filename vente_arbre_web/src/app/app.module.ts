import { NgModule, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule, routing } from './app.routing';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AlertComponent, DialogComponent, DialogEntryComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService, CustomerService } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ComponentsModule } from './_components/navigation';

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
    DialogEntryComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    CustomerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DialogEntryComponent]
})
export class AppModule { }
