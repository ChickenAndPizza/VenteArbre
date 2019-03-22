import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, UserService } from '../_services';
import { ConnectionInfo } from 'app/_models/connectionInfo.model';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}


  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.connectionModel; }

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
}
