import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { MainService } from '../main/main.service';
import { Tree } from 'app/_models';
import { AlertService } from '..';

@Injectable({
  providedIn: 'root'
})
export class TreeService extends MainService {

  currentTree: string;


  constructor(injector: Injector) {
    super(injector);
  }

  setCurrentTree(tree: string) {
    this.currentTree = tree;
  }

  getCurrentTree() {
    return this.currentTree;
  }

  getTree(): Observable<Tree> {
    let url = this.apiUrl.toString() + "Tree/" + this.currentTree;

    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Tree>(url);
  }

  validateTreeOfCategory(description: string, categoryId: string, treeId: string) {
    let url = '';
    if (treeId) {
      url = this.apiUrl.toString() + "Tree/Description?description=" + description + "&categoryId=" + categoryId + "&treeId=" + treeId;
    } else {
      url = this.apiUrl.toString() + "Tree/Description?description=" + description + "&categoryId=" + categoryId;
    }

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

  postImage(fileToUpload: File, treeId: string): Observable<any> {
    const url = this.apiUrl.toString() + "Tree/Image";
    const formData: FormData = new FormData();
    console.log(fileToUpload);
    formData.append('image', fileToUpload, fileToUpload.name);
    formData.append('treeId', treeId);
    const upload = new HttpRequest('POST', url, formData);
    return this.http.request(upload);
  }

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
