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

  public SetWhyCreate() {
    if (document.getElementById('whycreate').style.display === '') {
      document.getElementById('whycreate').style.display = 'none';
    }
    else{
      document.getElementById('whycreate').style.display = '';
    }

  }

}
