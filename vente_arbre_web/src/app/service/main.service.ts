import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'app/models/ApiConfig.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  apiUrl = '';
  protected http: HttpClient;

    constructor(@Inject(Injector) injector: Injector,
        apiConfig?: ApiConfig,) { 
        
        if(!apiConfig){
            apiConfig = new ApiConfig();
        }

        this.http.get("assets/config.json").subscribe(config => {
            apiConfig.url = config['apiUrl'];
        });

        this.http = injector ? injector.get(HttpClient) : null; 
    } 
}
