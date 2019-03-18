import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiUrl = 'http://localhost:5000/api/';

  protected http: HttpClient;

    constructor(@Inject(Injector) injector: Injector) { 

        this.http = injector ? injector.get(HttpClient) : null; 

        // if(!this.apiUrl){
        //     this.http.get("assets/config.json").subscribe(config => {
        //         this.apiUrl = config['apiUrl'];
        //         console.log(this.apiUrl);
        //     });
        // }
    } 
}
