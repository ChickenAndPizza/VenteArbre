import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
}
