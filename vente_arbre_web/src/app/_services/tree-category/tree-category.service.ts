import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MainService } from '..';
import { TreeCategory } from 'app/_models';

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

  getCategoriesWithTrees():Observable<any[]> {
    const url = this.apiUrl.toString() + "TreeCategory/GetCategoriesWithTrees";
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
