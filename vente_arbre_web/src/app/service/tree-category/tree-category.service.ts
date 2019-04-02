import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TreeCategory } from 'app/_models/tree-category';

@Injectable({
  providedIn: 'root'
})
export class TreeCategoryService extends MainService {

  currentCategory: TreeCategory;

  constructor(injector: Injector) {
    super(injector);
  }

  setCurrentCategory(category: TreeCategory){
    this.currentCategory = category;
  }

  getCurrentCategory(){
    return this.currentCategory;
  }

  getCategoriesAndSubCategories():Observable<any[]> {
    const url = this.apiUrl.toString() + "TreeCategory/GetCategoriesAndSubCategories";
      return this.http.get<any[]>(url);
  }

  validateTreeCategory(description: string) {
    let url = this.apiUrl.toString() + "TreeCategory/Description?description=" + description;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<boolean[]>(url);
}

  addOrUpdateCategory(newCategory: any): Observable<any> {
    const url = this.apiUrl.toString() + "TreeCategory";
    return this.http.post(
      url,
      JSON.stringify(newCategory),
      {
        headers: this.headers
      }
    )
  };

  delete(id: string) {
    const url = this.apiUrl.toString() + "TreeCategory/" + id;
    return this.http.delete(
      url,
      {
        headers: this.headers,
      }
    )
  }
}
