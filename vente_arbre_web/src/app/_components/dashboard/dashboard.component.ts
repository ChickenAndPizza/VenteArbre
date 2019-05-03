import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TreeService, TreeCategoryService } from 'app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  randomTrees: any[];

  constructor(
    private treeCategoryService: TreeCategoryService,
    private treeService: TreeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadRandomTrees();
  }

  loadRandomTrees() {
    this.treeService.getRandomTrees().subscribe(
      categories => {
        this.randomTrees = categories;
      }
    );
  }

  viewTree(categoryId: string, treeId: string) {
    this.treeCategoryService.getCategoryDescription(categoryId).subscribe(categoryDescr => {
      this.router.navigate(['/tree-info'], { queryParams: { id: treeId, categ: categoryId, descr: categoryDescr } });
    });
  }

}
