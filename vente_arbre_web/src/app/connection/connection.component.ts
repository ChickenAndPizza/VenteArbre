import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services/';
import { ConnectionInfo } from 'app/_models/connectionInfo.model';
import { CustomerService } from 'app/service/customer/customer.service';
import { existingEmailValidator } from 'app/shared/email-validator.directive';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private customerService: CustomerService) {}

  ngOnInit() {
    this.register = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], existingEmailValidator(this.customerService)],
      password: ['', [Validators.required]]
    })

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.connectionModel; }
  get email() { return this.register.get('email');}
  get phoneNumber() { return this.register.get('phoneNumber');}
  get lastName() { return this.register.get('lastName');}
  get firstName() { return this.register.get('firstName');}
  get password() { return this.register.get('password');}

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if ((<HTMLInputElement>document.getElementsByName('action')[0]).value == 'connection') {
      this.authenticationService.login(this.f)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
    else {

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

  public HideCreationDetails(){
    document.getElementById('whycreate').style.display = 'none';
    document.getElementById('shipping').style.display = 'none';
  }

  public ShowCreate(){
    if (document.getElementById('createaccount').style.display === 'none') {
      document.getElementById('createaccount').style.display = '';
      document.getElementById('connection').style.display = 'none';
    }
  }

  public ShowConnection(){
    if (document.getElementById('connection').style.display === 'none') {
      document.getElementById('connection').style.display = '';
      document.getElementById('createaccount').style.display = 'none';
    }
    this.HideCreationDetails();
  }
  onRegister() {

    if(this.customerService){

      let customer: any;
      this.customerService.createCustomer(this.register.value).subscribe(c => {
        customer = c;
      });

    }
  }

}