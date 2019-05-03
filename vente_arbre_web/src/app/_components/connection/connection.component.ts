import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuthenticationService, CustomerService, AlertService } from 'app/_services';
import { existingEmailValidator } from 'app/_shared';
import { ConnectionInfo } from 'app/_models';
import { decodeToken } from 'app/_helpers';

declare const $: any;

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  returnUrl: string;
  currentUser: any;

  connectionModel = new ConnectionInfo('', '');
  informations: FormGroup;
  register: FormGroup;
  connection: FormGroup;

  loading: boolean = false;
  submitted: boolean = false;

  whyCreate: boolean = false;
  shipping: boolean = false;

  showCreateAccount: boolean = true;
  showConnection: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    if (this.isMobileMenu()){
      this.showConnection = false;
    }

    this.register = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required], existingEmailValidator(null, this.customerService)],
      password: ['', [Validators.required]]
    });

    this.connection = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.connection; }
  get email() { return this.register.get('email'); }
  get phoneNumber() { return this.register.get('phoneNumber'); }
  get lastName() { return this.register.get('lastName'); }
  get firstName() { return this.register.get('firstName'); }
  get password() { return this.register.get('password'); }

  get emailConnection() { return this.connection.get('email'); }
  get passwordConnection() { return this.connection.get('password'); }

  onConnection() {
    this.authenticationService.login(this.f.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]).then(c => {
            if (this.isAdmin())
              window.location.reload(true);
          });

        },
        error => {
          this.alertService.error(error);
        });
  }

  onRegister() {
    if (this.customerService) {
      let customer: any;
      this.customerService.addOrUpdateCustomer(this.register.value).subscribe(c => {
        customer = c;
        this.connection.get('email').setValue(customer.email);
        this.connection.get('password').setValue(customer.password);
        this.onConnection();
      });

    }
  }

  isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);

    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      return true;
    else
      return false;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  public ChangeTabs() {
    this.showCreateAccount = !this.showCreateAccount; 
    this.showConnection = !this.showConnection
  }
}