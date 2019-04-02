import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConnectionInfo } from 'app/_models';
import { AuthenticationService, CustomerService, AlertService } from 'app/_services';
import { existingEmailValidator } from 'app/_shared';

declare const $: any;

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  connectionModel = new ConnectionInfo('', '');
  informations: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  register: FormGroup;
  connection: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private customerService: CustomerService) { }

  ngOnInit() {
    if (this.isMobileMenu())
      this.ShowCreate();

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
          this.router.navigate([this.returnUrl]);
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

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  public SetWhyCreate() {
    if (document.getElementById('whycreate').style.display === '') {
      document.getElementById('whycreate').style.display = 'none';
    }
    else {
      document.getElementById('whycreate').style.display = '';
    }
  }

  public SetShipping() {
    if (document.getElementById('shipping').style.display === '') {
      document.getElementById('shipping').style.display = 'none';
    }
    else {
      document.getElementById('shipping').style.display = '';
    }
  }

  public ShowCreate() {
    document.getElementById('createaccount').style.display = '';
    document.getElementById('connection').style.display = 'none';
  }

  public ShowConnection() {
    document.getElementById('connection').style.display = '';
    document.getElementById('createaccount').style.display = 'none';
  }
}