import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, UserService } from '../_services';

declare const $: any;

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  informations: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}


  ngOnInit() {
    this.informations = this.formBuilder.group({
        register: this.formBuilder.group({
          company: ['', Validators.required],
          phoneNumber: ['', Validators.required],
          email: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          userName: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          address: ['', Validators.required],
          city: ['', Validators.required],
          postalCode: ['', Validators.required]
        }),
        connection: this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        })
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.informations.controls; }

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
    else{
      document.getElementById('whycreate').style.display = '';
    }
  }

  public SetShipping() {
    if (document.getElementById('shipping').style.display === '') {
      document.getElementById('shipping').style.display = 'none';
    }
    else{
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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.informations.invalid) {
        return;
    }

    this.loading = true;
    this.userService.register(this.informations.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/dashbord']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

  /*onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }*/
}
