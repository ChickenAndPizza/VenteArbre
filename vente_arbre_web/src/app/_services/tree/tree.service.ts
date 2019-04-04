import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MainService } from '../main/main.service';
import { Tree } from 'app/_models';

@Injectable({
  providedIn: 'root'
})
export class TreeService extends MainService {

  currentTree: string;


  constructor(injector: Injector) {
    super(injector);
  }

  setCurrentTree(tree: string){
    this.currentTree = tree;
  }

  getCurrentTree(){
    return this.currentTree;
  }

  getTree(): Observable<Tree> {
    let url = this.apiUrl.toString() + "Tree/" + this.currentTree;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Tree>(url);
  }

  validateTreeOfCategory(description: string, categoryId: string) {
    let url = this.apiUrl.toString() + "Tree/Description?description=" + description + '&categoryId=' + categoryId;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<boolean[]>(url);
  }

  addOrUpdateTree(newTree: any): Observable<any> {
    const url = this.apiUrl.toString() + "Tree";
    return this.http.post(
      url,
      JSON.stringify(newTree),
      {
        headers: this.headers
      }
    )
  };

  delete(id: string) {
    const url = this.apiUrl.toString() + "Tree/" + id;
    return this.http.delete(
      url,
      {
        headers: this.headers,
      }
    )
  }
}
