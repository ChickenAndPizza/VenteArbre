import { Component, OnInit } from '@angular/core';
import { TreeCategoryService } from 'app/service/tree-category/tree-category.service';
import { decodeToken } from 'app/_helpers/jwt.decoder';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {

  treeCategories: any[];
  currentUser: any;
  admin: boolean = false;

  constructor(
    private treeCategoryService: TreeCategoryService,
  ) { }

  ngOnInit() {
    this.loadTreeCategories();
    this.isAdmin();
  }

  private isAdmin(): boolean
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = decodeToken(this.currentUser);
    
    if (this.currentUser.isAdmin.toLowerCase() != 'false')
      this.admin = true;
      
    return this.admin;
  }

  private loadTreeCategories() {
    this.treeCategoryService.getCategoriesAndSubCategories().subscribe(
      categories => {
        this.treeCategories = categories;
      }
    );
  }

  public ShowNewCategory() {
      document.getElementById('newCategory').style.display = '';
  }

  public HideNewCategory() {
    document.getElementById('newCategory').style.display = 'none';
  }

  public AddNewCategory() {
    this.HideNewCategory()
  }

}
