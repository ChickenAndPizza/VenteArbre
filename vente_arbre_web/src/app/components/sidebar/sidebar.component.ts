import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Nouveautés',  icon: 'dashboard', class: '' },
    { path: '/tree-list', title: 'Liste complète des arbres',  icon:'view_list', class: '' },
    { path: '/distribution-points', title: 'Points de distribution',  icon:'location_on', class: '' },
    { path: '/user-profile', title: 'Profil',  icon:'person', class: '' },
    { path: '/about-us', title: 'À propos',  icon:'chat', class: '' },
    { path: '/connection', title: 'Connexion',  icon:'person', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems = ROUTES.filter(menuItem => menuItem.title !== 'Connexion');
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
