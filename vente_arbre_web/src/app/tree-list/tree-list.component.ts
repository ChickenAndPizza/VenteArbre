import { Component, OnInit } from '@angular/core';
import { TreeCategoryService } from 'app/service/tree-category/tree-category.service';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {

  treeCategories: any[];
  currentUser: any;

  constructor(
    private treeCategoryService: TreeCategoryService,
  ) { }

  ngOnInit() {
    this.loadTreeCategories();

  }

  private isAdmin(): boolean
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return false;
  }

  private loadTreeCategories() {
    this.treeCategoryService.getCategoriesAndSubCategories().subscribe(
      categories => {
        this.treeCategories = categories;
      }
    );
  }

}
