import { Component, OnInit } from '@angular/core';
import { decodeToken } from 'app/_helpers';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  inSidebar: boolean;
  isAdmin: boolean;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Accueil', icon: 'dashboard', class: '', inSidebar: true, isAdmin: false },
  { path: '/tree-list', title: 'Liste des produits', icon: 'view_list', class: '', inSidebar: true, isAdmin: false },
  { path: '/tree-add', title: 'Ajouter un arbre', icon: '', class: '', inSidebar: false, isAdmin: false },
  { path: '/tree-info', title: 'Visionner un arbre', icon: '', class: '', inSidebar: false, isAdmin: false },
  { path: '/distribution-points', title: 'Points de distribution', icon: 'location_on', class: '', inSidebar: true, isAdmin: false },
  { path: '/user-profile', title: 'Profil', icon: 'person', class: '', inSidebar: true, isAdmin: false },
  { path: '/about-us', title: 'À propos', icon: 'chat', class: '', inSidebar: true, isAdmin: false },
  { path: '/connection', title: 'Connexion', icon: '', class: '', inSidebar: false, isAdmin: false },
  { path: '/cart', title: 'Panier', icon: '', class: '', inSidebar: false, isAdmin: false },
  { path: '/order-supplier-info', title: 'Détail de la commande au fournisseur', icon: '', class: '', inSidebar: false, isAdmin: false },
  { path: '/orders-in-progress', title: 'Commandes en cours', icon: 'shopping_cart', class: '', inSidebar: true, isAdmin: true },
  { path: '/orders-summary', title: 'Bilan des commandes', icon: 'shopping_cart', class: '', inSidebar: true, isAdmin: true },
  { path: '/orders-processed', title: 'Commandes traitées', icon: 'shopping_cart', class: '', inSidebar: true, isAdmin: true },
  { path: '/orders-shipped', title: 'Bilan de livraison', icon: '', class: '', inSidebar: false, isAdmin: false },
  { path: '/previous-orders-supplier', title: 'Commandes précédentes au fournisseur', icon: '', class: '', inSidebar: false, isAdmin: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currentUser: any;
  admin: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isAdmin();
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    if (this.admin)
      this.menuItems = ROUTES.filter(menuItem => menuItem.inSidebar === true); 
    else
      this.menuItems = ROUTES.filter(menuItem => menuItem.inSidebar === true && menuItem.isAdmin === false); 
  }

  isMobileMenu() {
    if ($(window).width() > 991)
      return false;
    return true;
  };

  private isAdmin(): boolean {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);
    if (this.currentUser && this.currentUser.isAdmin && this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;
    return this.admin;
  }
}
