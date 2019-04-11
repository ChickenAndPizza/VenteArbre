import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Accueil', icon: 'dashboard', class: '' },
    { path: '/tree-list', title: 'Liste des produits', icon:'view_list', class: '' },
    { path: '/tree-add', title: 'Ajouter un arbre', icon:'view_list', class: '' },
    { path: '/tree-info', title: 'Visionner un arbre', icon:'view_list', class: '' },
    { path: '/distribution-points', title: 'Points de distribution', icon:'location_on', class: '' },
    { path: '/user-profile', title: 'Profil', icon:'person', class: '' },
    { path: '/about-us', title: 'À propos', icon:'chat', class: '' },
    { path: '/connection', title: 'Connexion', icon:'person', class: '' },
    { path: '/cart', title: 'Panier', icon:'shopping_cart', class:'' }
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
    this.menuItems = ROUTES.filter(menuItem => menuItem.title !== 'Connexion' && menuItem.title !== 'Ajouter un arbre' && menuItem.title !== 'Visionner un arbre' && menuItem.title !== 'Panier');
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
