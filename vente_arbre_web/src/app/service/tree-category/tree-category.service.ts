import { Injectable, Injector } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeCategoryService extends MainService {

  constructor(injector: Injector) {
    super(injector);
  }

  getCategoriesAndSubCategories():Observable<any[]> {
    const url = this.apiUrl.toString() + "TreeCategory/GetCategoriesAndSubCategories";
      return this.http.get<any[]>(url);
  }
}
